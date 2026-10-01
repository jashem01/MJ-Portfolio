export default function AboutText() {
  return (
    <div className="dashed-frame p-8 md:p-10 backdrop-blur-md bg-black/40 group relative overflow-hidden">
      {/* Corner Notches */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/60 group-hover:border-[#a194f7] transition-colors"></div>

      <h3 className="text-2xl md:text-3xl font-black text-white tracking-wide mb-6 uppercase flex items-center gap-3">
        <span>About Me</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#a194f7]" />
      </h3>

      <div className="space-y-5 text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
        <p>
          I'm a Frontend Developer specializing in React.js, UI Design, No Code Platforms,  
          Generative AI Tools, WordPress, MS Excel and Next.js,
          passionate about creating responsive, scalable, and user-centric
          web applications. My focus is on building clean interfaces,
          optimizing performance, and delivering seamless digital experiences.
        </p>

        <p className="pt-2 border-t border-white/[0.06] text-zinc-400">
          Frontend Developer currently working at MRG Engineering, focused on building responsive and scalable web applications using React.js.
          Passionate about modern frontend development, UI implementation, performance optimization, and continuously expanding expertise in Next.js and modern web technologies.
        </p>
      </div>
    </div>
  );
}