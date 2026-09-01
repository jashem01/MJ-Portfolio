export default function AboutText() {
  return (
    <div className="dashed-frame p-8 backdrop-blur-sm bg-black/20">
      {/* Corner Notches */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>

      <h3 className="text-3xl font-black text-white tracking-wide mb-6 uppercase">
        About Me
      </h3>

      <p className="text-zinc-400 leading-8 text-sm md:text-base">
        I'm a Frontend Developer specializing in React.js, UI Design, No Code Platforms,  
        Generative AI Tools, WordPress, MS Excel and Next.js,
        passionate about creating responsive, scalable, and user-centric
        web applications. My focus is on building clean interfaces,
        optimizing performance, and delivering seamless digital experiences.
      </p>

      <p className="text-zinc-400 leading-8 text-sm md:text-base mt-6">
        Frontend Developer currently working at MRG Engineering, focused on building responsive and scalable web applications using React.js.
         Passionate about modern frontend development, UI implementation, performance optimization, and continuously expanding expertise in Next.js and modern web technologies.
      </p>
    </div>
  );
}