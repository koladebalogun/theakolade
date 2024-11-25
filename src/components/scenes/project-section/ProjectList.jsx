import React, { useState } from "react";
import Projects from "./Projects";
import Scene from "../image-shader/ImageShaderScene";

export default function ProjectList() {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div>
      <Projects setActiveMenu={setActiveMenu} />
      <Scene activeMenu={activeMenu} />
    </div>
  );
}
