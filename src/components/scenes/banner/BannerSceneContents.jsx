import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../../utils/GlobalState";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import InfoOne from "../../banner-scene-info/InfoOne";
import InfoTwo from "../../banner-scene-info/InfoTwo";
import InfoThree from "../../banner-scene-info/InfoThree";

gsap.registerPlugin(CustomEase);

export default function SceneOneContent() {
  const [currentScene] = useAtom(currentSceneAtom);

  useEffect(() => {
    if (currentScene === 2) {
      gsap.fromTo(
        ".scene2_container",
        { opacity: 0, x: 50 }, // Start with opacity 0 and offset
        {
          opacity: 1,
          x: 0,
          ease: "power1.inOut",
          duration: 1.2,
        }
      );

      // Create the custom ease for hop animation
      CustomEase.create(
        "hop",
        "M0,0 C0.29,0 0.348,0.05 0.422,0.134 0.494,0.217 0.484,0.355 0.5,0.5 0.518,0.662 0.515,0.793 0.596,0.876 0.701,0.983 0.72,0.987 1,1"
      );

      // Split text into spans for individual animations
      splitTextIntoSpans(".header h1");

      // Animate the hero element
      gsap.to(".hero", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 2,
        ease: "hop",
        onStart: () => {
          // Ensure all transforms are combined into one gsap call
          gsap.to(".hero", {
            transform: "scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          });

          gsap.to(".overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 2,
            ease: "hop",
            delay: 0.5,
          });

          gsap.to(".hero-img img", {
            transform: "scale(1)",
            duration: 2.25,
            ease: "power3.inOut",
            delay: 0.25,
          });

          gsap.to(".header h1 span", {
            y: 0,
            stagger: 0.1,
            ease: "power4.inOut",
            duration: 2,
            delay: 0.75,
          });
        },
      });
    }
  }, [currentScene]);

  function splitTextIntoSpans(selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      let text = element.innerText;
      let splitText = text
        .split("")
        .map(function (char) {
          return `<span>${char === "" ? "&nbsp;&nbsp;" : char}</span>`;
        })
        .join("");

      element.innerHTML = splitText;
    });
  }

  return (
    <div>
      <InfoOne />
      <InfoTwo />
      <InfoThree />
    </div>
  );
}
