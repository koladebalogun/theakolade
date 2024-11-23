import React, { Suspense, useEffect } from "react";
import Interface from "./components/Interface";
import Navbar from "./components/nav/Navbar";
import { useProgress } from "@react-three/drei";

function App() {
  const {progress} = useProgress()

  console.log(progress)

  return (
    <>
      <Navbar />
      <Interface />
    </>
  );
}

export default App;
