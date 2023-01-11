import Lights from "./Lights.js";
import { Debug, Physics } from "@react-three/cannon";
import { Perf } from "r3f-perf";
import { OrbitControls, PivotControls } from "@react-three/drei";

import Player from "./Player.js";

// Misc
import Floor from "./Floor.js";
import Rock from "./Rock.js";
import Palm from "./Palm.js";
import Brick from "./Brick.js";
import Lamp from "./Lamp.js";
import Craft from "./Craft.js";

export default function Experience() {
  const PLAYER_POSITION = [0, 1.5, 0];
  const PLAYER_ROTATION = [0, -Math.PI / 2, 0];
  const PLAYER_ANGULAR_VELOCITY = [0, 0.5, 0];

  return (
    <>
      <Physics broadphase='SAP'>
        <color attach='background' args={["ivory"]} />
        <Lights />
        <PivotControls>
          <Floor rotation={[-Math.PI / 2, 0, 0]} />
        </PivotControls>

        <Player
          position={PLAYER_POSITION}
          rotation={PLAYER_ROTATION}
          angularVelocity={PLAYER_ANGULAR_VELOCITY}
        />
        {/* <Debug scale={2}> */}
        {/* Palms */}
        <Palm position={[4, 0, 2]} scale={[1.2, 1.2, 1.2]} />
        <Palm position={[, 0, 5]} scale={[0.9, 0.9, 0.9]} />
        <Palm position={[-1.5, 0, 4]} scale={[1.1, 1.1, 1.1]} />
        {/* Rocks */}
        <Rock position={[3, 0, -1]} scale={[1.2, 1.2, 1.2]} />
        <Rock
          userData={{ id: "stones1" }}
          position={[-4, 0, -1.5]}
          scale={[1, 1, 1]}
          rotation={[0, Math.PI, 0]}
        />
        <Rock
          position={[-6.5, 0, 4.5]}
          scale={[0.7, 0.7, 0.7]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        {/* Bricks */}
        <Brick
          position={[-12.5, 0, 1.5]}
          scale={[0.7, 0.7, 0.7]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Brick scale={[1, 1, 1]} position={[-11.5, 0, 1.5]} />
        {/* Lamp */}
        <Lamp position={[-10, 0, 1]} scale={[0.25, 0.25, 0.25]} />
        {/* Crafts */}
        <Craft position={[-3, 1, -6]} scale={[1, 1, 1]} />
        <Craft position={[-3.5, 2, -6]} scale={[1, 1, 1]} />
        <Craft position={[-4, 1, -6]} scale={[1, 1, 1]} />
        <Craft position={[-4.5, 2, -6]} scale={[1, 1, 1]} />
        <Craft position={[-5, 1, -6]} scale={[1, 1, 1]} />
        <Craft position={[-5.5, 2, -6]} scale={[1, 1, 1]} />
        <Craft position={[-6, 1, -6]} scale={[1, 1, 1]} />
        <Craft position={[-4, 3, -6]} scale={[1, 1, 1]} />
        <Craft position={[-5, 3, -6]} scale={[1, 1, 1]} />
        <Craft position={[-4.5, 4, -6]} scale={[1, 1, 1]} />
        {/* </Debug> */}
      </Physics>
      {/* <OrbitControls makeDefault /> */}
      {/* <Perf position='top-left' /> */}
    </>
  );
}
