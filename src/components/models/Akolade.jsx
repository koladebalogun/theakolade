import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../utils/GlobalState";

export default function Akolade() {
  const model = useLoader(GLTFLoader, "models/koladebalogun.glb");
  const headRef = useRef();
  const [currentScene] = useAtom(currentSceneAtom);
  const ref = useRef();

  let clock = 0;
  const speed = 0.06; // Adjust the speed of the bopping
  const amplitude = 0.1; // Adjust the amplitude of the bop

  useEffect(() => {
    const headMesh = model.scene.getObjectByName("Head");
    if (headMesh) {
      headRef.current = headMesh;
    } else {
      console.warn("Head mesh not found");
    }
  }, [model]);

  useFrame((state, delta) => {
    if (currentScene >= 2 && headRef.current) {
      clock += speed;
      headRef.current.rotation.x = Math.sin(clock) * amplitude; // Bop effect
    }
  });

  return (
    <mesh ref={ref} position={[0, -3, 1]} scale={1.7}>
      <primitive object={model.scene} scale={1} />
    </mesh>
  );
}
