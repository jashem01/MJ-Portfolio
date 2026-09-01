import { FaGithub } from "react-icons/fa";

export default function Github() {
  return (
    <section
      id="github"
      className="py-32"
    >
      <div className="section-container">

        <div className="mb-16">
          <p className="text-zinc-500 uppercase tracking-[0.25em] text-sm">
            GitHub
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Open Source & Code
          </h2>
        </div>

        <div className="glass-card p-10">

          <div className="flex items-center gap-4 mb-6">
            <FaGithub size={40} />
            <div>
              <h3 className="text-2xl font-semibold">
                jashem01
              </h3>

              <p className="text-zinc-400">
                Frontend Developer
              </p>
            </div>
          </div>

          <p className="text-zinc-400 max-w-2xl leading-8">
            Passionate about building web applications with React.js
            and continuously exploring Next.js, Tailwind CSS,
            and modern frontend technologies.
          </p>

          <a
            href="https://github.com/jashem01"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              mt-8
              px-6
              py-3
              rounded-xl
              bg-white
              text-black
              font-medium
            "
          >
            Visit GitHub
            </a>
            
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="skill-pill">React.js</span>
              <span className="skill-pill">JavaScript</span>
              <span className="skill-pill">Next.js</span>
              <span className="skill-pill">Frontend</span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="glass-card p-5">
                <h4 className="text-xl font-semibold">React.js</h4>
              </div>
              <div className="glass-card p-5">
                <h4 className="text-xl font-semibold">Frontend</h4>
              </div>
              <div className="glass-card p-5">
                <h4 className="text-xl font-semibold">Learning Next.js</h4>
              </div>
            </div>


        </div>

      </div>
    </section>
  );
}