import React, { useEffect, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";
import { useProgress } from "@react-three/drei";

export default function Robo() {
  const model = useLoader(GLTFLoader, "/models/robo.glb");
  const mixer = useRef(null);
  const { progress } = useProgress();

  useEffect(() => {
    if (model.animations.length) {
      mixer.current = new AnimationMixer(model.scene);
      const action = mixer.current.clipAction(model.animations[0]);
      action.play();
    }
  }, [model]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <mesh position={[0, -1.5, 2]} scale={0.5}>
      <primitive object={model.scene} />
    </mesh>
  );
}
