"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function AuraChat({
  messages,
  onClose,
  input,
  setInput,
  handleSend,
  isLoading,
  projectContext,
}) {
  const isProjectMode =
    projectContext && projectContext.contextMode === "project_deep_dive";

  return (
    <div
      className="
        fixed
        right-5
        top-5
        bottom-5
        z-[100]

        flex
        flex-col

        w-[min(440px,calc(100vw-40px))]

        overflow-hidden

        rounded-[30px]

        border
        border-cyan-300/20

        bg-[#02050b]

        text-white
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          h-[72px]
          shrink-0
          items-center
          justify-between

          border-b
          border-white/[0.08]

          px-6
        "
      >
        <div>
          <div
            className="
              text-lg
              tracking-[4px]
              text-white
            "
          >
            AURA AI
          </div>

          {isProjectMode ? (
            /* PROJECT CONTEXT INDICATOR */
            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
              "
            >
              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-blue-400
                  shadow-[0_0_4px_rgba(96,165,250,0.8)]
                "
              />
              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[2px]
                  text-blue-400
                  font-mono
                "
              >
                {projectContext.projectName} • PROJECT CONTEXT
              </span>
            </div>
          ) : (
            <div
              className="
                mt-1
                text-[9px]
                uppercase
                tracking-[3px]
                text-cyan-300
              "
            >
              Personal AI Assistant
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            text-xl
            text-gray-400
            transition
            hover:text-cyan-300
          "
        >
          ×
        </button>
      </div>


      {/* =================================================
          ROBOT RESERVED AREA
      ================================================= */}

      <div
        className="
          h-[220px]
          shrink-0
        "
      />


      {/* =================================================
          MESSAGES
      ================================================= */}

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        setInput={setInput}
        handleSend={handleSend}
      />


      {/* =================================================
          INPUT
      ================================================= */}

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />

      {/* =================================================
          AI DISCLOSURE (Requirement 24)
      ================================================= */}
      <div className="pb-3.5 pt-1.5 text-center bg-[#02050b] border-t border-white/[0.04]">
        <p className="text-[9px] font-mono tracking-wider text-gray-500/70">
          AI responses are generated with Google Gemini.
        </p>
      </div>

    </div>
  );
}