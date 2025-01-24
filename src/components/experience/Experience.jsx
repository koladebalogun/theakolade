import React, { useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, ScrollControls, Text } from "@react-three/drei";
import { getProject } from "@theatre/core";
import { SheetProvider, editable as e } from "@theatre/r3f";
import Scene from "../scenes/banner/BannerScene";
import akolade from "../../utils/akolade.json";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../utils/GlobalState";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SceneOneContent from "../scenes/banner/BannerSceneContents";
import { sRGBEncoding, ACESFilmicToneMapping } from "three";

gsap.registerPlugin(useGSAP);

export const Experience = () => {
  const textRef = useRef();
  const [currentScene] = useAtom(currentSceneAtom);
  const sheet = getProject("Fly Through", { state: akolade }).sheet("Scene");

  useLayoutEffect(() => {
    if (textRef.current) {
      gsap.from(textRef.current.position, {
        y: 30,
        duration: 1,
        ease: "power1.iout",
      });

      gsap.to(textRef.current.material, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, []);

  return (
    <>
      <nav>
        <div className="logo">
          k./b
        </div>
      </nav>
      <Canvas
        shadows
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
        gl={{
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
        }}
      >
        {/* <ScrollControls pages={3.5} maxSpeed={0.1}>
          <SheetProvider sheet={sheet}>
            <Scene />

            <e.group ref={textRef} theatreKey="text">
              <Center>
                <Text
                  position={[4, 4, -12]}
                  color="white"
                  fontSize={4}
                  font="fonts/Blanquotey.ttf"
                >
                  AKOLADE
                </Text>
              </Center>
            </e.group>
          </SheetProvider>
        </ScrollControls> */}
      </Canvas>

      <SceneOneContent />

      <div>
        {/* <div className="side-info">
          <h3>Kolade Balogun 2024</h3>
        </div> */}

          <div className="indicator-wrapper">
            <p>Scroll Down</p>
            <div className="indicator"></div>
          </div>
      </div>
    </>
  );
};
