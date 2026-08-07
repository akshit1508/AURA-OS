import ABOUT_DATA from "@/constants/about";

export default function AboutImage() {
  return (
    <div className="flex justify-center">

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-xl
        "
      >

        {/* Avatar */}
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-5xl font-bold text-white">
          {ABOUT_DATA.avatar}
        </div>

        {/* Name */}
        <h3 className="mt-6 text-center text-3xl font-bold text-white">
          {ABOUT_DATA.name}
        </h3>

        {/* Role */}
        <p className="mt-2 text-center text-blue-400">
          {ABOUT_DATA.role}
        </p>

        {/* Info */}
        <div className="mt-8 space-y-4">

          <div className="flex justify-between">
            <span className="text-gray-400">
              Location
            </span>

            <span className="text-white">
              {ABOUT_DATA.location}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Degree
            </span>

            <span className="text-white">
              {ABOUT_DATA.degree}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Focus
            </span>

            <span className="text-white">
              {ABOUT_DATA.focus}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}