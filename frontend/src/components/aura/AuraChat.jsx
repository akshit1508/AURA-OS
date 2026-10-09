"use client";

import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function AuraChat({
  messages,
  onClose,
  onClearConversation,
  input,
  setInput,
  handleSend,
  isLoading,
  projectContext,
}) {
  const isProjectMode = Boolean(projectContext && projectContext.projectId);

  return (
    <div
      className="
        fixed
        inset-2 sm:inset-auto sm:right-5 sm:top-5 sm:bottom-5
        z-[100]

        flex
        flex-col

        w-auto sm:w-[440px]

        overflow-hidden

        rounded-2xl sm:rounded-[30px]

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
          h-[60px] sm:h-[72px]
          shrink-0
          items-center
          justify-between

          border-b
          border-white/[0.08]

          px-4 sm:px-6
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

        <div className="flex items-center gap-3">
          {messages && messages.length > 1 && onClearConversation && (
            <button
              type="button"
              onClick={onClearConversation}
              title="Reset conversation"
              aria-label="Reset conversation"
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-md
                border
                border-white/10
                bg-white/[0.04]
                text-xs
                font-mono
                text-gray-400
                transition
                hover:border-cyan-400/40
                hover:bg-cyan-500/10
                hover:text-cyan-300
              "
            >
              ↺
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              text-xl
              text-gray-400
              transition
              hover:text-cyan-300
            "
          >
            ×
          </button>
        </div>
      </div>


      {/* =================================================
          ROBOT RESERVED AREA
      ================================================= */}

      <div
        className="
          h-[140px] sm:h-[220px]
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