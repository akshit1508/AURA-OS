"use client";

import dynamic from "next/dynamic";

const ResumeViewer = dynamic(() => import("@/components/resume/ResumeViewer"), {
  ssr: false,
});

export default function ResumePage() {
  return <ResumeViewer />;
}