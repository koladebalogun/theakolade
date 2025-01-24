import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// Lazy load the Robo component
const Robo = lazy(() => import("../../models/Robo"));

// Memoized Canvas to prevent unnecessary re-renders
const MemoizedCanvas = memo(() => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <hemisphereLight intensity={0.7} groundColor="gray" />
    <Suspense fallback={null}>
      <Robo />
    </Suspense>
  </Canvas>
));

export default function PreLoader({ setIsLoaded }) {
  const { progress } = useProgress(); // Track actual loading progress
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    // Throttle updates to displayed progress
    const interval = setInterval(() => {
      setDisplayedProgress((prev) =>
        prev < progress ? Math.min(prev + 5, progress) : prev
      );
    }, 50);

    if (displayedProgress >= 100) {
      clearInterval(interval);
      setTimeout(() => setIsLoaded(true), 200);
    }

    return () => clearInterval(interval);
  }, [progress, displayedProgress, setIsLoaded]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={displayedProgress === 100 ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 1.5, ease: "easeInOut" } }}
      className="preloader-wrapper"
    >
      <div className="preloader-inner">
        <h1 className="preloader-text">Loading...</h1>
        {displayedProgress < 100 && <MemoizedCanvas />}
      </div>
    </motion.div>
  );
}
