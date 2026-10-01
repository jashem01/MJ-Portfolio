import HeroContentLeft from "./HeroContentLeft";
import HeroContentRight from "./HeroContentRight";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:py-0 overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left: WHAT I DO */}
          <div className="w-full lg:col-span-3 flex justify-center lg:justify-start relative z-20">
            <HeroContentLeft />
          </div>

          {/* Center: 3D Wireframe Laptop & Orbiting Skills */}
          <div className="w-full lg:col-span-5 min-h-[420px] md:min-h-[500px] flex items-center justify-center relative z-10 my-4 lg:my-0">
            <HeroImage />
          </div>

          {/* Right: Developer / Design Cards */}
          <div className="w-full lg:col-span-4 relative z-20">
            <HeroContentRight />
          </div>
          
        </div>
      </div>
    </section>
  );
}