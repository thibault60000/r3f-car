import Lights from "./Lights.js";
import { Debug, Physics } from "@react-three/cannon";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";

import Player from "./Player.js";

import Scene from "./Scene.js";

export default function Experience() {
  const PLAYER_POSITION = [0, 1.5, 0];
  const PLAYER_ROTATION = [0, -Math.PI / 2, 0];
  const PLAYER_ANGULAR_VELOCITY = [0, 0.5, 0];

  return (
    <>
      <Physics broadphase='SAP'>
        <color attach='background' args={["ivory"]} />

        <Lights />

        <Player
          position={PLAYER_POSITION}
          rotation={PLAYER_ROTATION}
          angularVelocity={PLAYER_ANGULAR_VELOCITY}
        />
        {/* <Debug scale={1.3} color='red'> */}
        <Scene />
        {/* </Debug> */}
      </Physics>
      {/* <OrbitControls makeDefault /> */}
      <Perf position='top-left' />
    </>
  );
}
