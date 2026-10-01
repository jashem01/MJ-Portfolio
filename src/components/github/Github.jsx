import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export default function Github() {
  return (
    <section id="github" className="py-24 md:py-32 relative">
      <div className="section-container">

        {/* Header */}
        <div className="mb-14 select-none">
          <span className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
            GITHUB
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Open Source <span className="text-gradient-accent">&amp; Code</span>
          </h2>
        </div>

        {/* Main Card */}
        <div className="dashed-frame p-8 md:p-12 backdrop-blur-md bg-black/40 group relative overflow-hidden">
          {/* Corner Notches */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/50 group-hover:border-[#a194f7] transition-colors"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:border-[#a194f7]/40 group-hover:text-[#a194f7] transition-all">
                <FaGithub size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  jashem01
                </h3>
                <p className="text-[#a194f7] text-sm font-medium">
                  Frontend Developer
                </p>
              </div>
            </div>

            <a
              href="https://github.com/jashem01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-[#a194f7] hover:text-black transition-all duration-300 self-start md:self-auto shadow-lg hover:shadow-[0_0_20px_rgba(161,148,247,0.4)]"
            >
              <span>Visit GitHub</span>
              <FiArrowUpRight size={16} />
            </a>
          </div>

          <p className="text-zinc-300 max-w-2xl leading-relaxed text-sm md:text-base font-normal mb-8">
            Passionate about building web applications with React.js
            and continuously exploring Next.js, Tailwind CSS,
            and modern frontend technologies.
          </p>
            
          {/* Skill Pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            <span className="skill-pill">React.js</span>
            <span className="skill-pill">JavaScript</span>
            <span className="skill-pill">Next.js</span>
            <span className="skill-pill">Frontend</span>
          </div>

          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#a194f7]/30 hover:bg-white/[0.04] transition-all">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Core Focus</p>
              <h4 className="text-lg font-bold text-white">React.js</h4>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#a194f7]/30 hover:bg-white/[0.04] transition-all">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Expertise</p>
              <h4 className="text-lg font-bold text-white">Frontend</h4>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#a194f7]/30 hover:bg-white/[0.04] transition-all">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1 font-semibold">Currently</p>
              <h4 className="text-lg font-bold text-white">Learning Next.js</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}