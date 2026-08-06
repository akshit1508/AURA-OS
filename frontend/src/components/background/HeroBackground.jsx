export default function HeroBackground() {
  return (
    <>
      {/* Background Gradient */}

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_40%)]
      "
      />

      {/* Grid */}

      <div
        className="
        absolute
        inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
        linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:60px_60px]
      "
      />
    </>
  );
}