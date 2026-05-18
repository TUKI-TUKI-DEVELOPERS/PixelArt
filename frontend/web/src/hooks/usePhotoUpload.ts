"use client";

import { useState, useCallback, useRef } from "react";
import { compressImage } from "@/lib/compressImage";

export type UploadedPhoto = {
  uid: number;       // local unique key (auto-increment, never sent to server)
  id: number;        // backend asset id (may repeat for same-content files)
  storageKey: string;
  contentHash: string;
  url: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  originalFilename: string;
  preview: string; // local object URL for immediate display
};

export type PendingDuplicate = {
  photo: UploadedPhoto;
  existingFilename: string;
};

type UploadState = {
  photos: UploadedPhoto[];
  pendingDuplicates: PendingDuplicate[];
  uploading: boolean;
  progress: number; // 0-100
  error: string | null;
};

const MAX_CONCURRENT = 3;

export function usePhotoUpload(folder: string = "uploads/customers") {
  const uidCounter = useRef(0);
  const [state, setState] = useState<UploadState>({
    photos: [],
    pendingDuplicates: [],
    uploading: false,
    progress: 0,
    error: null,
  });

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const imageFiles = files.filter((f) => f.type.startsWith("image/"));
      if (imageFiles.length === 0) return;

      setState((s) => ({ ...s, uploading: true, progress: 0, error: null }));

      // C5b: Client-side compression before upload
      const compressedFiles = await Promise.all(
        imageFiles.map((f) => compressImage(f)),
      );

      // C5a: Parallel uploads with concurrency pool
      const uploaded: UploadedPhoto[] = [];
      const errors: string[] = [];
      let completed = 0;
      let index = 0;

      async function uploadOne(file: File): Promise<UploadedPhoto> {
        const formData = new FormData();
        formData.append("file", file);

        // C4: Use public upload endpoint (no JWT required)
        const res = await fetch(
          `/api/assets/upload-public?folder=${encodeURIComponent(folder)}`,
          { method: "POST", body: formData },
        );

        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: "Upload failed" }));
          throw new Error(err.message ?? "Upload failed");
        }

        const data = await res.json();
        return {
          uid: ++uidCounter.current,
          id: data.id,
          storageKey: data.storageKey,
          contentHash: data.contentHash,
          url: data.url,
          thumbnailUrl: data.thumbnailUrl ?? null,
          width: data.width ?? null,
          height: data.height ?? null,
          originalFilename: file.name,
          preview: URL.createObjectURL(file),
        };
      }

      async function worker() {
        while (index < compressedFiles.length) {
          const currentIndex = index++;
          try {
            const result = await uploadOne(compressedFiles[currentIndex]);
            uploaded.push(result);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Upload failed";
            errors.push(message);
          }
          completed++;
          setState((s) => ({
            ...s,
            progress: Math.round((completed / compressedFiles.length) * 100),
          }));
        }
      }

      const workers = Array.from(
        { length: Math.min(MAX_CONCURRENT, compressedFiles.length) },
        () => worker(),
      );
      await Promise.all(workers);

      setState((s) => {
        const existingIds = new Set(s.photos.map((p) => p.id));
        const newPhotos: UploadedPhoto[] = [];
        const duplicates: PendingDuplicate[] = [];
        for (const u of uploaded) {
          if (existingIds.has(u.id)) {
            const existing = s.photos.find((p) => p.id === u.id)!;
            duplicates.push({ photo: u, existingFilename: existing.originalFilename });
          } else {
            newPhotos.push(u);
          }
        }
        return {
          ...s,
          photos: [...s.photos, ...newPhotos],
          pendingDuplicates: [...s.pendingDuplicates, ...duplicates],
          uploading: false,
          progress: 100,
          error: errors.length > 0 ? errors[0] : null,
        };
      });
    },
    [folder],
  );

  const removePhoto = useCallback((uid: number) => {
    setState((s) => {
      const photo = s.photos.find((p) => p.uid === uid);
      if (photo) URL.revokeObjectURL(photo.preview);
      return { ...s, photos: s.photos.filter((p) => p.uid !== uid) };
    });
  }, []);

  const resolveDuplicate = useCallback((uid: number, action: "add" | "skip") => {
    setState((s) => {
      const pending = s.pendingDuplicates.find((d) => d.photo.uid === uid);
      if (!pending) return s;
      const remaining = s.pendingDuplicates.filter((d) => d.photo.uid !== uid);
      if (action === "skip") {
        URL.revokeObjectURL(pending.photo.preview);
        return { ...s, pendingDuplicates: remaining };
      }
      return { ...s, photos: [...s.photos, pending.photo], pendingDuplicates: remaining };
    });
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  // Restore photos from a saved draft (assigns fresh uids, uses CDN URL as preview)
  const restorePhotos = useCallback((restoredPhotos: Omit<UploadedPhoto, "uid">[]) => {
    const withFreshUids: UploadedPhoto[] = restoredPhotos.map((p) => ({
      ...p,
      uid: ++uidCounter.current,
      preview: p.url || p.preview,
    }));
    setState((s) => ({ ...s, photos: withFreshUids }));
  }, []);

  return {
    photos: state.photos,
    pendingDuplicates: state.pendingDuplicates,
    uploading: state.uploading,
    progress: state.progress,
    error: state.error,
    uploadFiles,
    removePhoto,
    resolveDuplicate,
    clearError,
    restorePhotos,
  };
}
