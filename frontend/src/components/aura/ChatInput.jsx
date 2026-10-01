"use client";

export default function ChatInput({
  input,
  setInput,
  handleSend,
}) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        shrink-0
        border-t
        border-white/[0.08]
        bg-[#02050b]
        p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/[0.1]
          bg-white/[0.02]
          px-4
          py-3
          transition
          focus-within:border-cyan-300/25
          focus-within:bg-cyan-300/[0.025]
        "
      >

        <input
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask AURA anything..."
          className="
            min-w-0
            flex-1
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-gray-700
          "
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim()}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-300/20
            bg-cyan-300/[0.04]
            text-cyan-300
            transition

            hover:scale-105
            hover:bg-cyan-300/[0.08]

            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:scale-100
          "
        >
          →
        </button>

      </div>
    </div>
  );
}