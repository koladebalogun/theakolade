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
      // initial={{ opacity: 0, y: 50 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 1, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default function Interface() {
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   if (!isLoaded) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isLoaded]);

  return (
    <div>
      {/* <AnimatePresence>
        {!isLoaded && <PreLoader setIsLoaded={setIsLoaded} />}
      </AnimatePresence> */}

      <Section />

      

      <Section>
        <Experience />
      </Section>

      <Section className="project-container">
        <ProjectExperience />
      </Section>
      <ProjectList />

      {/* <Section>
        <ContactUsExperience />
      </Section> */}
    </div>
  );
}
