import { Environment, OrbitControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { val } from "@theatre/core";
import {
  PerspectiveCamera,
  useCurrentSheet,
  editable as e,
} from "@theatre/r3f";

import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { currentPageAtom, currentSceneAtom } from "../../../utils/GlobalState";
import Akolade from "../../models/Akolade";

export default function Scene({ children }) {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [currentScene, setCurrentScene] = useAtom(currentSceneAtom);

  const sequenceLength = val(sheet.sequence.pointer.length);

  function logCurrentPageCallback(scroll, callback) {
    const currentPage = Math.floor(scroll.offset * scroll.pages) + 1;

    const positionWithinPage = (scroll.offset * scroll.pages) % 1;

    const sceneOffsetForCurrentPage = Math.floor(positionWithinPage * 1) + 1;

    const computedScene = (currentPage - 1) * 1 + sceneOffsetForCurrentPage;
    setCurrentScene(computedScene);

    // console.log("current page:", currentPage);
    callback(currentPage);
  }

  useEffect(() => {
    console.log("current scene", currentScene);
  }, [currentScene]);

  useFrame(() => {
    if (scroll) {
      logCurrentPageCallback(scroll, setCurrentPage);
      sheet.sequence.position = scroll.offset * sequenceLength;
    }
  });

  return (
    <>
      <Environment files={"/env/map8k.hdr"} />

      <directionalLight intensity={1} />
      <ambientLight intensity={1} />

      <e.group theatreKey="avatar">
        <Akolade />
      </e.group>

      <PerspectiveCamera
        theatreKey="camera"
        makeDefault
        position={[2, 0, 0]}
        near={0.1}
        far={100}
      />
    </>
  );
}
