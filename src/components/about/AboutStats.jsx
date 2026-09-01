export default function AboutStats() {
  return (
    <div className="flex flex-col gap-6">

      <div className="dashed-frame p-6 backdrop-blur-sm bg-black/20">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>

        <p className="text-[#a194f7] text-xs uppercase tracking-[0.2em] mb-2 font-bold">
          CURRENT ROLE
        </p>

        <h3 className="text-xl font-bold text-white">
          Frontend Developer
        </h3>

        <p className="text-zinc-400 mt-2 text-sm">
          MRG Engineering
        </p>
      </div>

      <div className="dashed-frame p-6 backdrop-blur-sm bg-black/20">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>

        <p className="text-[#a194f7] text-xs uppercase tracking-[0.2em] mb-2 font-bold">
          SPECIALIZATION
        </p>

        <h3 className="text-xl font-bold text-white">
          React.js
        </h3>
      </div>

      <div className="dashed-frame p-6 backdrop-blur-sm bg-black/20">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>

        <p className="text-[#a194f7] text-xs uppercase tracking-[0.2em] mb-2 font-bold">
          LOCATION
        </p>

        <h3 className="text-xl font-bold text-white">
          Thanjavur, Tamil Nadu, India
        </h3>
      </div>

    </div>
  );
}