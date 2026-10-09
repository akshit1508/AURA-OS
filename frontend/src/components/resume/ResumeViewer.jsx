"use client";

import { useState } from "react";
import {Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


export default function ResumeViewer(){
    const [scale,setScale] = useState(1);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    function nextPage(){
        setCurrentPage((previousPage) => Math.min(numPages, previousPage + 1)
    );
    }

    function previousPage(){
        setCurrentPage((previousPage) => Math.max(1, previousPage - 1)
    );
    }

    function onDocumentLoadSuccess({ numPages }){
        setNumPages(numPages);
    }

    function zoomIn(){
        setScale((previousScale) => previousScale + 0.1);
    }

    function zoomOut(){
        setScale((previousScale) => Math.max(0.6,previousScale - 0.1)
    );
    }

    return (
        <main className="min-h-screen bg-[#030712] px-3 sm:px-6 pb-20 pt-24 sm:pt-28 text-white">

      {/* Page Heading */}

      <div className="mx-auto max-w-6xl">

        <p className="text-xs font-semibold uppercase tracking-[5px] text-blue-400">
          Professional Profile
        </p>

        <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-4xl font-bold">
              Resume
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              A detailed overview of my technical skills,
              experience, projects, and engineering journey.
            </p>

          </div>

          {/* Actions */}

          <div className="flex gap-3">

            <a
              href="/resume/Akshit's Resume.pdf"
              download
              className="
                rounded-full
                border
                border-blue-500/30
                bg-blue-500/10
                px-5
                py-2.5
                text-sm
                font-medium
                text-blue-300
                transition-all
                duration-300
                hover:border-blue-400
                hover:bg-blue-500/20
                hover:text-white
              "
            >
              Download
            </a>

            <a
              href="/resume/Akshit's Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-5
                py-2.5
                text-sm
                font-medium
                text-gray-300
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
              "
            >
              Open PDF
            </a>

          </div>

        </div>

      </div>

      {/* Resume Viewer */}

      <div className="mx-auto mt-10 max-w-6xl">

        {/* Viewer Header */}

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">

          {/* Viewer Title */}

          <div>

            <p className="text-xs uppercase tracking-[3px] text-blue-400">
              Document Viewer
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Akshit Bhandari — Resume
            </p>

          </div>

          {/* Viewer Controls */}

          <div className="flex flex-wrap items-center gap-2">

            <button
              onClick={zoomOut}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-white/10
                bg-white/5
                text-lg
                text-gray-300
                transition
                hover:border-blue-500/30
                hover:bg-blue-500/10
                hover:text-white
              "
            >
              −
            </button>

            <span className="min-w-[60px] text-center text-sm text-gray-300">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                border border-white/10
                bg-white/5
                text-lg
                text-gray-300
                transition
                hover:border-blue-500/30
                hover:bg-blue-500/10
                hover:text-white
              "
            >
              +
            </button>

            <div className="mx-2 h-6 w-px bg-white/10" />

            <button
  onClick={previousPage}
  disabled={currentPage === 1}
  className="
    rounded-full
    border
    border-white/10
    bg-white/5
    px-4
    py-2
    text-sm
    text-gray-300
    transition
    hover:border-blue-500/30
    hover:bg-blue-500/10
    hover:text-white
    disabled:cursor-not-allowed
    disabled:opacity-30
  "
>
  ←
</button>

<span className="min-w-[70px] text-center text-sm text-gray-400">
  {currentPage} / {numPages || "—"}
</span>

<button
  onClick={nextPage}
  disabled={currentPage === numPages || numPages === 0}
  className="
    rounded-full
    border
    border-white/10
    bg-white/5
    px-4
    py-2
    text-sm
    text-gray-300
    transition
    hover:border-blue-500/30
    hover:bg-blue-500/10
    hover:text-white
    disabled:cursor-not-allowed
    disabled:opacity-30
  "
>
  →
</button>

          </div>

        </div>

        {/* PDF Area */}

        <div className="overflow-auto rounded-b-3xl border-x border-b border-white/10 bg-[#11131c] p-2 sm:p-6">

          <div className="flex justify-center">

            <Document
              file="/resume/Akshit's Resume.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="py-20 text-sm text-gray-400">
                  Loading resume...
                </div>
              }
              error={
                <div className="py-20 text-sm text-red-400">
                  Unable to load resume.
                </div>
              }
            >

              <Page
                pageNumber={1}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />

            </Document>

          </div>

        </div>

      </div>

    </main>
    );
}