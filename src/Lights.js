import { useRef } from "react";

export default function Lights() {
  const lightRef = useRef();

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[0, 4, 0]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}
