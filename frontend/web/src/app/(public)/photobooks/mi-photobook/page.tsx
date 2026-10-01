import { Suspense } from "react";
import CustomPhotobookFullEditorClient from "./CustomPhotobookFullEditorClient";

export default function CustomPhotobookFullEditorPage() {
  return <Suspense fallback={null}><CustomPhotobookFullEditorClient /></Suspense>;
}
