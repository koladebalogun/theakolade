import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, ScrollControls, Scroll } from "@react-three/drei";
import Slides from "../scenes/project-section/ProjectSlides";
import TextSlides from "../scenes/project-section/ProjectTextSlides";

export default function ProjectExperience() {
  return (
    <div
      className="scroll-container"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls infinite horizontal pages={3} distance={1}>
            <Scroll>
              <Slides />
            </Scroll>
            <Scroll html>
              <TextSlides />
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>

      <div className="project-scroll-indicator-wrapper">
        <p>Scroll Sideways</p>
        <div className="scroll-indicator"></div>
      </div>
    </div>
  );
}
