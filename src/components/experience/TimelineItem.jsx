export default function TimelineItem({
  company,
  role,
  period,
  points,
}) {
  return (
    <div className="relative pl-12">

      <div
        className="
        absolute
        left-0
        top-2
        w-5
        h-5
        rounded-full
        border
        border-white
        bg-black
      "
      />

      <div
        className="
        absolute
        left-[9px]
        top-8
        bottom-[-40px]
        w-px
        bg-zinc-700
      "
      />

      <div>
        <h3 className="text-2xl font-semibold">
          {company}
        </h3>

        <p className="text-zinc-400 mt-2">
          {role}
        </p>

        <p className="text-zinc-500 mt-1">
          {period}
        </p>

        <ul className="mt-5 space-y-2">
          {points.map((point) => (
            <li
              key={point}
              className="text-zinc-400"
            >
              • {point}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}