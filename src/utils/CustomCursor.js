import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
