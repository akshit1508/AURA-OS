export default function ContactSuccess({onBack}) {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="w-full max-w-xl text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/[0.06] shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          <span className="text-xl text-blue-300">
            ✓
          </span>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[4px] text-blue-400">
          Transmission Complete
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-white">
          Message Successfully Delivered
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
          Your message has been securely delivered.
          Akshit will connect with you shortly.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="
            mt-8
            inline-flex
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/[0.03]
            px-6
            py-3
            text-[10px]
            uppercase
            tracking-[2px]
            text-gray-300
            transition-all
            duration-300
            hover:border-blue-400/30
            hover:bg-blue-500/[0.05]
            hover:text-white
          "
        >
          ← Return to Contact
        </button>

        <div className="mx-auto mt-8 h-px w-24 bg-blue-400/30" />

        <p className="mt-6 text-[10px] uppercase tracking-[3px] text-gray-600">
          AURA COMMUNICATION SYSTEM
        </p>

      </div>
    </div>
  );
}