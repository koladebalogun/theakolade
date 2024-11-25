import React, { useEffect,useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

export default function Model(props) {
  const model = useLoader(GLTFLoader, "models/workspace.glb");
  const [scale, setScale] = useState(1);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) {
          child.material.map.encoding = THREE.sRGBEncoding;
        }
        if (child.material.emissiveMap) {
          child.material.emissiveMap.encoding = THREE.sRGBEncoding;
        }
      }
    });

  }, [model]);
  

  return (
    <mesh>
      <primitive object={model.scene} scale={1} />
    </mesh>
  );
}
