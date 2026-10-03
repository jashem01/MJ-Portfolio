"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
  id: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Work", href: "#projects", id: "projects" },
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to dynamically track active section
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Centered Pill Navbar */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-1.5 sm:py-2 transition-all duration-300 ${
            scrolled ? "shadow-md shadow-black/30 border-white/15 bg-surface/90" : "shadow-sm"
          }`}
          aria-label="Main Navigation"
        >
          {/* Logo Circle (36px circle) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Mohammed Jashem Home"
            className="w-9 h-9 rounded-full relative group flex items-center justify-center p-[1.5px] transition-transform duration-300 hover:scale-110 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {/* Reversible Gradient Ring Border on Hover */}
            <span
              className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,hsl(var(--accent-lavender)),hsl(var(--accent-deep)))] group-hover:bg-[linear-gradient(270deg,hsl(var(--accent-lavender)),hsl(var(--accent-deep)))] transition-all duration-500"
              aria-hidden="true"
            />
            {/* Inner Dark Circle */}
            <span className="relative z-10 w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary tracking-tight font-normal">
                MJ
              </span>
            </span>
          </a>

          {/* Divider */}
          <span className="hidden md:block h-4 w-px bg-stroke/60 mx-1.5 sm:mx-2" aria-hidden="true" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs sm:text-sm rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                    isActive
                      ? "text-text-primary bg-stroke/50 shadow-inner font-semibold"
                      : "text-muted hover:text-text-primary hover:bg-stroke/50"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <span className="hidden lg:block h-4 w-px bg-stroke/60 mx-1.5 sm:mx-2" aria-hidden="true" />

          {/* Email Pill with Gradient Ring Hover (matching link height and rhythm) */}
          <div className="hidden lg:block">
            <a
              href="mailto:mohammedjashemofficial564@gmail.com"
              className="relative group inline-flex rounded-full p-[1px] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span
                className="absolute inset-[-1.5px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px] pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative z-10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface border border-stroke text-xs sm:text-sm font-mono text-muted group-hover:text-text-primary transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
                connect@mohammedjashem
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden ml-2 p-1.5 rounded-full text-muted hover:text-text-primary hover:bg-stroke/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Glass Sheet / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex items-start justify-center pt-24 px-4 pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Glass Sheet Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl bg-surface/95 border border-white/10 p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4 z-50"
            >
              <div className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`text-sm rounded-2xl px-4 py-3 transition-all duration-200 font-medium ${
                        isActive
                          ? "text-text-primary bg-stroke/60 font-semibold"
                          : "text-muted hover:text-text-primary hover:bg-stroke/30"
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-stroke/50 flex flex-col gap-3">
                <a
                  href="mailto:mohammedjashemofficial564@gmail.com"
                  className="w-full text-center py-2.5 rounded-full bg-surface border border-stroke text-xs font-mono text-muted hover:text-text-primary hover:border-accent/50 transition-colors"
                >
                  connect@mohammedjashem
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
