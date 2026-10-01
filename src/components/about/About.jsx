import AboutText from "./AboutText";
import AboutStats from "./AboutStats";
import Reveal from "@/components/common/Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="section-container">
        
        <Reveal>
          <div className="mb-14 select-none">
            <span className="text-[#a194f7] uppercase tracking-[0.25em] text-xs font-bold block mb-3">
              ABOUT ME
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Building modern{" "}
              <span className="text-gradient-accent block sm:inline">digital experiences.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <Reveal delay={0.2}>
              <AboutText />
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 xl:col-span-4">
            <Reveal delay={0.35}>
              <AboutStats />
            </Reveal>
          </div>
        </div>
        
      </div>
    </section>
  );
}