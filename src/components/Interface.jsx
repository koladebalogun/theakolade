import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "./experience/Experience";
import ProjectExperience from "./experience/ProjectExperience";
import ContactUsExperience from "./experience/ContactUsExperience";
import ProjectList from "./scenes/project-section/ProjectList";
import PreLoader from "./scenes/preloader/PreLoader";

const Section = ({ children, className }) => {
  return (
    <motion.section
      className={`section ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default function Interface() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoaded]);

  return (
    <div>
      <AnimatePresence>
        {!isLoaded && <PreLoader setIsLoaded={setIsLoaded} />}
      </AnimatePresence>

      <motion.div
        className="canvas-container"
        style={{
          backgroundColor: "#FFF5EE",
          visibility: isLoaded ? "visible" : "hidden",
        }}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Experience />
      </motion.div>

      {/* <Section className="project-container">
        <ProjectExperience />
      </Section> */}
      <ProjectList />

      {/* <Section>
        <ContactUsExperience />
      </Section> */}
    </div>
  );
}
