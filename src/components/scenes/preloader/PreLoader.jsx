import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Robo from "../../models/Robo";

export default function PreLoader({ setIsLoaded }) {
  const { progress } = useProgress(); // Track actual loading progress
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    // Smoothly update displayed progress
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev < progress) {
          return Math.min(prev + 1, progress);
        }
        return prev;
      });
    }, 16);

    if (displayedProgress >= 100) {
      clearInterval(interval);
      setTimeout(() => setIsLoaded(true), 500);
    }

    return () => clearInterval(interval);
  }, [progress, displayedProgress, setIsLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={displayedProgress === 100 ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 1, ease: "easeInOut" } }}
      className="preloader-wrapper"
    >
      <div className="preloader-inner">
        <h1 className="preloader-text">Loading...</h1>
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          {/* <Robo /> */}
        </Canvas>
      </div>
    </motion.div>
  );
}
