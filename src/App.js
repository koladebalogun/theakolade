import React, { Suspense, useEffect } from "react";
import Interface from "./components/Interface";
import Navbar from "./components/nav/Navbar";
import { useProgress } from "@react-three/drei";
import CustomCursor from "./utils/CustomCursor";

function App() {
  const {progress} = useProgress()

  console.log(progress)

  return (
    <>
      <CustomCursor />
      <Navbar />
      <Interface />
    </>
  );
}

export default App;
