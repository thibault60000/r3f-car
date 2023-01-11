import Floor from "./Floor.js";
import Ramp from "./Ramp.js";
import Lights from "./Lights.js";
import { Debug, Physics } from "@react-three/cannon";
import Player from "./Player.js";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import ForestThree from "./ForestThree.js";

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
        <Debug scale={2}>
          <ForestThree position={[2, 0, 2]} />
          <ForestThree position={[4, 0, 4]} />
          <ForestThree position={[-1, 0, 3]} />
        </Debug>
      </Physics>
      {/* <OrbitControls makeDefault /> */}
      <Perf position='top-left' />
    </>
  );
}
