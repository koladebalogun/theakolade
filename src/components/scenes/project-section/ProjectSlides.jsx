import React, { useRef, Suspense, memo } from "react";
import { Image, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import img1 from "../../../images/img1.jpeg";
import img2 from "../../../images/img2.jpeg";
import img3 from "../../../images/img3.jpeg";
import img4 from "../../../images/img4.jpeg";
import img5 from "../../../images/5.jpeg";
import img6 from "../../../images/test.JPG";

function DreiImage({ scale, url, ...props }) {
  const ref = useRef(null);
  const group = useRef(null);
  const data = useScroll();

  useFrame((state, delta) => {
    if (!data.delta || !group.current || !ref.current) return;

    // Optimize animations to prevent over-processing
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
  });

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        <Image ref={ref} scale={scale} url={url} {...props} />
      </Suspense>
    </group>
  );
}

const Slide = memo(function Slide({ urls = [""], position }) {
  const { width } = useThree((state) => state.viewport);
  const isSmallScreen = width < 10;
  const imageScale = isSmallScreen ? [3, 4] : [5, 7]; // Adjust scale for screen size

  return (
    <group position={position}>
      <DreiImage position={[-width / 3, 0, 0]} scale={imageScale} url={urls[0]} />
      <DreiImage position={[0, 0, 0]} scale={isSmallScreen ? [4, 3] : [7, 6]} url={urls[1]} />
      <DreiImage position={[width / 3, 0, 0]} scale={isSmallScreen ? [3, 6] : [5, 5]} url={urls[2]} />
    </group>
  );
});

export default function Slides() {
  const { width } = useThree((state) => state.viewport);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Slide position={[0, 0, 0]} urls={[img1, img2, img3]} />
        <Slide position={[width * 1, 0, 0]} urls={[img4, img5, img6]} />
        <Slide position={[width * 2, 0, 0]} urls={[img1, img2, img3]} />
      </Suspense>
    </>
  );
}
