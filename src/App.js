import React, { Suspense, useEffect } from "react";
import Interface from "./components/Interface";
import { useProgress } from "@react-three/drei";
import CustomCursor from "./utils/CustomCursor";
import Footer from "./components/Footer/Footer";

function App() {
  const {progress} = useProgress()

  console.log(progress)

  return (
    <>
    <>
      <CustomCursor />
      <Interface />
      <Footer />
    </>
    </>
  );
}

export default App;
