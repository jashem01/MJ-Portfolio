export default function BackgroundEffects() {
  return (
    <>
      <div
        className="
        fixed
        top-0
        left-0
        h-[600px]
        w-[600px]
        bg-white/[0.03]
        blur-[140px]
        rounded-full
        -z-10
        "
      />

      <div
        className="
        fixed
        bottom-0
        right-0
        h-[500px]
        w-[500px]
        bg-white/[0.02]
        blur-[120px]
        rounded-full
        -z-10
        "
      />
    </>
  );
}