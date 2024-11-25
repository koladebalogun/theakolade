import { Canvas } from "@react-three/fiber";
import React from "react";
import { SheetProvider } from "@theatre/r3f";
import { sRGBEncoding, ACESFilmicToneMapping } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactUs from "../scenes/contact-us/ContactUs";
import { getTheatreProject } from "../../utils/theatreProjectCache";
import { ScrollControls } from "@react-three/drei";
import contact from "../../utils/contact.json";
import { currentSceneAtom1 } from "../../utils/GlobalState";
import { useAtom } from "jotai";

gsap.registerPlugin(useGSAP);

export default function ContactUsExperience() {
  const theatreProject = getTheatreProject("Fly Through - Contact Us", {
    state: contact,
  });
  const sheet = theatreProject.sheet("ContactUsScene");
  const [currentScene] = useAtom(currentSceneAtom1);

  return (
    <div className="contact-us-wrapper">
      <Canvas
        shadows
        style={{
          width: "100%",
          height: "100%",
        }}
        gl={{
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding,
        }}
      >
        <ScrollControls pages={4.14} maxSpeed={0.1}>
          <SheetProvider sheet={sheet}>
            <ContactUs />
          </SheetProvider>
        </ScrollControls>
      </Canvas>

      {currentScene === 5 && (
        <div className="iframe-container">
          <iframe src="https://koladescontact.vercel.app/" />
        </div>
      )}

      {currentScene < 5 && (
        <div className="contact-scroll-indicator-wrapper">
          <p>Scroll Down</p>
          <div className="contact-indicator"></div>
        </div>
      )}
    </div>
  );
}
