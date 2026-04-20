"use client";

import { useState, useCallback } from "react";
import { compressImage } from "@/lib/compressImage";

export type UploadedPhoto = {
  id: number;
  storageKey: string;
  contentHash: string;
  url: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  originalFilename: string;
  preview: string; // local object URL for immediate display
};

type UploadState = {
  photos: UploadedPhoto[];
  uploading: boolean;
  progress: number; // 0-100
  error: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const MAX_CONCURRENT = 3;

export function usePhotoUpload(folder: string = "uploads/customers") {
  const [state, setState] = useState<UploadState>({
    photos: [],
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
          `${API_BASE}/api/assets/upload-public?folder=${encodeURIComponent(folder)}`,
          { method: "POST", body: formData },
        );

        if (!res.ok) {
          const err = await res.json().catch(() => ({ message: "Upload failed" }));
          throw new Error(err.message ?? "Upload failed");
        }

        const data = await res.json();
        return {
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

      setState((s) => ({
        ...s,
        photos: [...s.photos, ...uploaded],
        uploading: false,
        progress: 100,
        error: errors.length > 0 ? errors[0] : null,
      }));
    },
    [folder],
  );

  const removePhoto = useCallback((contentHash: string) => {
    setState((s) => {
      const photo = s.photos.find((p) => p.contentHash === contentHash);
      if (photo) URL.revokeObjectURL(photo.preview);
      return { ...s, photos: s.photos.filter((p) => p.contentHash !== contentHash) };
    });
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    photos: state.photos,
    uploading: state.uploading,
    progress: state.progress,
    error: state.error,
    uploadFiles,
    removePhoto,
    clearError,
  };
}
