"use client";
import AuraAvatar from "./AuraAvatar";
import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

/* =====================================================
   USER AVATAR
===================================================== */

function UserAvatar() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-violet-300/20
        bg-violet-300/[0.06]
        text-[10px]
        font-medium
        text-violet-200
      "
    >
      AK
    </div>
  );
}


/* =====================================================
   THINKING INDICATOR
===================================================== */

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">

      <AuraAvatar />

      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          rounded-bl-md
          border
          border-cyan-300/10
          bg-cyan-300/[0.04]
          px-4
          py-3
        "
      >

        <div className="flex items-center gap-1">

          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-cyan-300
            "
          />

          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-cyan-300
            "
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="
              h-1.5
              w-1.5
              animate-bounce
              rounded-full
              bg-cyan-300
            "
            style={{ animationDelay: "300ms" }}
          />

        </div>

        <span
          className="
            text-[10px]
            uppercase
            tracking-[2px]
            text-cyan-300/70
          "
        >
          AURA is thinking...
        </span>

      </div>

    </div>
  );
}


/* =====================================================
   SUGGESTED QUESTION CHIPS
===================================================== */

function SuggestionChips({ suggestions, setInput, handleSend, isLoading }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={isLoading}
          onClick={() => {
            if (isLoading) return;
            setInput(suggestion);
            handleSend(suggestion);
          }}
          className="
            cursor-pointer
            rounded-full
            border
            border-cyan-400/25
            bg-cyan-400/[0.05]
            px-3.5
            py-1.5
            font-mono
            text-[9px]
            uppercase
            tracking-[1.5px]
            text-cyan-300
            shadow-[0_0_8px_rgba(34,211,238,0.04)]
            transition-all
            duration-200
            hover:border-cyan-300/60
            hover:bg-cyan-300/[0.12]
            hover:text-white
            hover:shadow-[0_0_12px_rgba(34,211,238,0.22)]
            active:scale-95
            disabled:pointer-events-none
            disabled:opacity-40
          "
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}


/* =====================================================
   MAIN CHAT MESSAGES
===================================================== */

export default function ChatMessages({
  messages,
  isLoading,
  setInput,
  handleSend,
}) {

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);


  return (
    <div
      className="
        min-h-0
        flex-1
        overflow-y-auto
        px-5
        py-5
        aura-scrollbar
      "
    >

      <div className="space-y-5">

        {/* =================================================
            MESSAGES
        ================================================= */}

        {messages.map((message) => {

          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`
                flex
                gap-3

                ${isUser ? "justify-end" : "justify-start"}
              `}
            >

              {/* AURA AVATAR */}
              {!isUser && <AuraAvatar />}


              {/* MESSAGE BUBBLE + CHIPS */}
              <div className={`max-w-[78%] ${isUser ? "flex flex-col items-end" : ""}`}>

                <div
                  className={`
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6
                    whitespace-pre-wrap

                    ${
                      isUser
                        ? `
                          rounded-br-md
                          border
                          border-cyan-300/20
                          bg-cyan-300/[0.07]
                          text-cyan-50
                        `
                        : `
                          rounded-bl-md
                          border
                          border-white/[0.08]
                          bg-white/[0.025]
                          text-gray-300
                        `
                    }
                  `}
                >
                  <div
                    className={`
                      mt-1
                      text-[9px]
                      text-gray-600
                      ${isUser ? "text-right" : "text-left"}
                    `}
                  >
                    {formatTime(message.timestamp)}
                  </div>

                  {message.type === "project" ? (
                    <ProjectCard
                      title={message.project.title}
                      description={message.project.description}
                      technologies={message.project.technologies}
                      github={message.project.github}
                      live={message.project.live}
                    />
                  ) : (
                    message.content
                  )}
                </div>

                {/* SUGGESTION CHIPS — only on AURA messages that have suggestions */}
                {!isUser && message.suggestions && message.suggestions.length > 0 && (
                  <SuggestionChips
                    suggestions={message.suggestions}
                    setInput={setInput}
                    handleSend={handleSend}
                    isLoading={isLoading}
                  />
                )}

              </div>


              {/* USER AVATAR */}
              {isUser && <UserAvatar />}

            </div>
          );
        })}


        {/* =================================================
            THINKING STATE
        ================================================= */}

        {isLoading && <TypingIndicator />}


        {/* =================================================
            AUTO-SCROLL TARGET
        ================================================= */}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}