import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ScrollHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        y: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />

      {/* Animated plant silhouette */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          <motion.rect
            x="200" y="300" width="100" height="200"
            fill="hsl(215 20% 25%)"
            initial={{ y: 500 }}
            animate={{ y: 300 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.rect
            x="220" y="150" width="30" height="150"
            fill="hsl(215 20% 30%)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.rect
            x="500" y="250" width="200" height="250"
            fill="hsl(215 20% 22%)"
            initial={{ y: 500 }}
            animate={{ y: 250 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.rect
            x="550" y="100" width="50" height="150"
            fill="hsl(215 20% 28%)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.rect
            x="850" y="280" width="150" height="220"
            fill="hsl(215 20% 25%)"
            initial={{ y: 500 }}
            animate={{ y: 280 }}
            transition={{ duration: 1.5, delay: 0.9 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-primary" fill="currentColor">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
            </svg>
          </div>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-eco"
        >
          How a Biomass Power Plant Works
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8"
        >
          From biomass to clean electricity — scroll to explore
        </p>

        <motion.p
          className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          Hi, I'm Asha — your guide through this renewable energy journey.
          Let's discover how organic materials become sustainable power.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to begin</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
