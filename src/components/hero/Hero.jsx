import HeroContentLeft from "./HeroContentLeft";
import HeroContentRight from "./HeroContentRight";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row justify-between items-center relative z-10">
        
        {/* Left: Socials and WHAT I DO */}
        <div className="w-full lg:w-1/4 flex-shrink-0 relative z-20">
          <HeroContentLeft />
        </div>

        {/* Center: 3D Element */}
        <div className="w-full lg:w-2/4 min-h-[500px] lg:h-[700px] relative z-10 flex items-center justify-center my-8 lg:my-0">
          <HeroImage />
        </div>

        {/* Right: Developer / Design Cards */}
        <div className="w-full lg:w-1/4 flex-shrink-0 relative z-20">
          <HeroContentRight />
        </div>
        
      </div>
    </section>
  );
}