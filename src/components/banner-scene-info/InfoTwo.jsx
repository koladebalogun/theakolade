import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { currentSceneAtom } from "../../utils/GlobalState";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import image2 from "../../images/image2.jpeg";

gsap.registerPlugin(CustomEase);

export default function InfoTwo() {
  const [currentScene] = useAtom(currentSceneAtom);

  useEffect(() => {
    if (currentScene === 3) {
      gsap.fromTo(
        ".containerTwo",
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
            opacity: 1,
          });

          gsap.to(".content", {
            y: 0,
            stagger: 0.1,
            ease: "power4.inOut",
            duration: 2,
            delay: 2,
            opacity: 1,
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
      {currentScene === 3 && (
        <div className="containerTwo">
          <div className="hero">
            <div className="overlay"></div>
            <div className="header">
              <h1>ABOUT - ME</h1>

              <p className="content">
                I’m enjoy creating web experiences that blend design with
                functionality. Beyond the code, I care a lot about how people
                interact with what I build, so I look for ways to make
                interfaces enjoyable to use. I think a great website is a mix of
                creativity and precision, and I’m constantly inspired by how
                much the web can do.
              </p>
            </div>

            <div className="hero-img">
              <img src={image2} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
