import AboutText from "./AboutText";
import AboutStats from "./AboutStats";
import Reveal from "@/components/common/Reveal";

export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="section-container">
        
        
        <Reveal>
          <div className="mb-16">
            <p className="text-[#a194f7] uppercase tracking-[0.25em] text-sm font-bold">
              ABOUT ME
            </p>
            <h2 className="text-5xl md:text-7xl font-bold mt-6 tracking-tight text-white">
              Building modern
              <br />
              <span className="text-gradient-accent">digital experiences.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
          <Reveal delay={0.2}>
            <AboutText />
          </Reveal>
          
          <Reveal delay={0.4}>
            <AboutStats />
          </Reveal>
        </div>
        
      </div>
    </section>
  );
}