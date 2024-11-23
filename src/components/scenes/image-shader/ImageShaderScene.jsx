import { Canvas } from "@react-three/fiber";
import React from "react";
import Model from "./ImageShader";

export default function Scene({ activeMenu }) {
  return (
    <div className="project_list">
      <Canvas>
        <Model activeMenu={activeMenu} />
      </Canvas>
    </div>
  );
}
