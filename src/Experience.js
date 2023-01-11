import Floor from "./Floor.js";
import Ramp from "./Ramp.js";
import Lights from "./Lights.js";
import { Physics } from "@react-three/cannon";
import Player from "./Player.js";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  const PLAYER_POSITION = [0, 1.5, 0];
  const PLAYER_ROTATION = [0, 0, 0];
  const PLAYER_ANGULAR_VELOCITY = [0, 0.5, 0];
  return (
    <>
      <Physics broadphase='SAP'>
        <color attach='background' args={["ivory"]} />
        <Lights />
        <Floor rotation={[-Math.PI / 2, 0, 0]} />
        <Ramp />
        <Player
          position={PLAYER_POSITION}
          rotation={PLAYER_ROTATION}
          angularVelocity={PLAYER_ANGULAR_VELOCITY}
        />
      </Physics>
      {/* <OrbitControls makeDefault /> */}
      <Perf position='top-left' />
    </>
  );
}
