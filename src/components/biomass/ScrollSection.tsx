import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  pin?: boolean;
  pinDuration?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}

export const ScrollSection = ({
  id,
  children,
  className = "",
  pin = false,
  pinDuration = 1,
  onEnter,
  onLeave,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Create scroll trigger for this section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => onEnter?.(),
        onLeave: () => onLeave?.(),
        onEnterBack: () => onEnter?.(),
        onLeaveBack: () => onLeave?.(),
      });

      // Pin effect if enabled
      if (pin) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * pinDuration}`,
          pin: true,
          pinSpacing: true,
        });
      }

      // Animate content on scroll
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [pin, pinDuration, onEnter, onLeave]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`min-h-screen relative ${className}`}
    >
      <div ref={contentRef} className="h-full">
        {children}
      </div>
    </section>
  );
};
