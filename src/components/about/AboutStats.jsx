export default function AboutStats() {
  return (
    <div className="flex flex-col gap-4">

      <div className="dashed-frame p-6 backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:translate-x-1">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

        <span className="text-[#a194f7] text-[10px] uppercase tracking-[0.25em] mb-1.5 font-bold block">
          CURRENT ROLE
        </span>

        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Frontend Developer
        </h3>

        <p className="text-zinc-400 mt-1 text-xs md:text-sm">
          MRG Engineering
        </p>
      </div>

      <div className="dashed-frame p-6 backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:translate-x-1">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

        <span className="text-[#a194f7] text-[10px] uppercase tracking-[0.25em] mb-1.5 font-bold block">
          SPECIALIZATION
        </span>

        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
          React.js
        </h3>
      </div>

      <div className="dashed-frame p-6 backdrop-blur-md bg-black/40 group relative overflow-hidden transition-all duration-300 hover:translate-x-1">
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

        <span className="text-[#a194f7] text-[10px] uppercase tracking-[0.25em] mb-1.5 font-bold block">
          LOCATION
        </span>

        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
          Thanjavur, Tamil Nadu, India
        </h3>
      </div>

    </div>
  );
}