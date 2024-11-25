import React, { useRef } from "react";
import { Image, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import img1 from "../../../images/img1.jpeg";
import img2 from "../../../images/img2.jpeg";
import img3 from "../../../images/img3.jpeg";
import img4 from "../../../images/img4.jpeg";
import img5 from "../../../images/5.jpeg";
import img6 from "../../../images/test.JPG";
import { MathUtils } from "three";

function DreiImage({ scale, ...props }) {
  const ref = useRef(null);
  const group = useRef(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (group.current && ref.current && data) {
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 100),
        4,
        delta
      );

      ref.current.material.grayscale = MathUtils.damp(
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <Image ref={ref} scale={scale} {...props} />
    </group>
  );
}

function Slide({ urls = [""], ...props }) {
  const { width } = useThree((state) => state.viewport);
  const isSmallScreen = width < 10;
  const imageScale = isSmallScreen ? [3, 4] : [5, 7]; // Adjust the scale for smaller screens

  return (
    <group {...props}>
      <DreiImage position={[-width / 3, 0, 0]} scale={imageScale} url={urls[0]} />
      <DreiImage position={[0, 0, 0]} scale={isSmallScreen ? [4, 3] : [7, 6]} url={urls[1]} />
      <DreiImage position={[width / 3, 0, 0]} scale={isSmallScreen ? [3, 6] : [5, 5]} url={urls[2]} />
    </group>
  );
}

export default function Slides() {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      <Slide position={[0, 0, 0]} urls={[img1, img2, img3]} />
      <Slide position={[width * 1, 0, 0]} urls={[img4, img5, img6]} />
      <Slide position={[width * 2, 0, 0]} urls={[img1, img2, img3]} />
    </>
  );
}
