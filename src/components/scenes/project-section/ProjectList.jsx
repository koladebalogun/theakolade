import React, { useState, useRef, useEffect } from "react";
import Projects from "./Projects";
import Scene from "../image-shader/ImageShaderScene";

export default function ProjectList() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the box is in view
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <div ref={boxRef} className={`color-changing-box ${isInView ? "in-view" : ""}`}>
      <Projects setActiveMenu={setActiveMenu} />
      <Scene activeMenu={activeMenu} />
    </div>
  );
}
