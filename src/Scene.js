import { useRef, useState } from "react";

import Floor from "./scene/Floor.js";
import Rock from "./scene/Rock.js";
import Palm from "./scene/Palm.js";
import Brick from "./scene/Brick.js";
import Lamp from "./scene/Lamp.js";
import Craft from "./scene/Craft.js";
import Grass from "./scene/Grass.js";
import Korrigan from "./scene/Korrigan.js";
import KorriganTaning from "./scene/KorriganTaning.js";
import Ramp from "./scene/Ramp.js";
import { Float, Text } from "@react-three/drei";
import Credits from "./scene/Credits.js";
import Ball from "./scene/Ball.js";
import { Debug, useBox } from "@react-three/cannon";

import { useGLTF } from "@react-three/drei";

useGLTF.preload("./models/misc/meat.gltf");

export default function Scene() {
  const korriganRef = useRef();
  const KorriganTaningRef = useRef();

  const model = useGLTF("./models/misc/meat.gltf");

  const [korrigan, setKorrigan] = useState({
    isAlive: true,
  });

  const [korriganTaning, setKorriganTaning] = useState({
    isAlive: true,
  });

  // TODO
  const spawnMeat = (rotation, position, scale) => {
    const [meatRef] = useBox(() => ({
      mass: 1,
      position: position,
      rotation: rotation,
      args: [scale[0] / 2, scale[1] / 4, scale[2] / 2],
    }));

    return (
      <mesh ref={meatRef} rotation={rotation} position={position} scale={scale}>
        <primitive object={model.scene} />
      </mesh>
    );
  };

  return (
    <group>
      {/* Floor */}
      <Floor rotation={[-Math.PI / 2, 0, 0]} />
      {/* Ball */}
      <Ball position={[1, 0.2, 3]} />
      {/* Credits */}
      <Credits
        text='@react-tree/fiber'
        position={[3.5, 0.2, -5]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='@react-tree/drei'
        position={[3.5, 0.2, -4]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='@react-tree/cannon'
        position={[3.5, 0.2, -3]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='@react-tree/postprocessing'
        position={[3.5, 0.2, -6]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='leva'
        position={[3.5, 0.2, -7]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='zustand'
        position={[3.5, 0.2, -8]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='market.pmnd.rs'
        position={[3.5, 0.2, -9]}
        rotation-x={-Math.PI / 2}
      />
      <Credits
        text='raycast-vehicle example'
        position={[3.5, 0.2, -10]}
        rotation-x={-Math.PI / 2}
      />

      {/* Korrigan */}
      {korrigan.isAlive && (
        <Korrigan
          ref={korriganRef}
          setKorrigan={setKorrigan}
          position={[2, 0, 2]}
          scale={[1, 1, 1]}
        />
      )}

      {korriganTaning.isAlive && (
        <KorriganTaning
          ref={KorriganTaningRef}
          setKorriganTaning={setKorriganTaning}
          position={[-1, 0, -2]}
          scale={[1, 1, 1]}
        />
      )}
      {/* Ramp */}
      <Ramp
        rotation={[Math.PI * 1.08, 0, 0]}
        position={[-7, -0.1, 1]}
        scale={[2, 0.3, 2]}
      />
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
      <Brick
        scale={[1, 1, 1]}
        rotation={[0, Math.PI / 3, 0]}
        position={[-11.5, 0, 1.5]}
      />
      {/* Grass */}
      <Grass scale={[1, 1, 1]} position={[-4.5, 0, 2.5]} />
      <Grass
        scale={[0.7, 0.7, 0.7]}
        rotation={[0, -Math.PI / 4, 0]}
        position={[0, 0, 4]}
      />
      <Grass scale={[1, 1, 1]} position={[-1, 0, -4]} />
      <Grass
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, Math.PI / 3, 0]}
        position={[-8, 0, -5.5]}
      />
      <Grass scale={[1, 1, 1]} position={[7.5, 0, -5]} />
      <Grass
        scale={[0.7, 0.7, 0.7]}
        rotation={[0, -Math.PI / 4, 0]}
        position={[5.5, 0, -8]}
      />
      <Grass scale={[0.5, 0.5, 0.5]} position={[1, 0, -7]} />
      <Grass scale={[1, 1, 1]} position={[4, 0, 6]} />
      <Grass
        scale={[0.7, 0.7, 0.7]}
        rotation={[0, -Math.PI / 4, 0]}
        position={[-7.5, 0, 7]}
      />
      <Grass scale={[1, 1, 1]} position={[-5.5, 0, 5]} />
      <Grass
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, Math.PI / 3, 0]}
        position={[-1, 0, 8.5]}
      />

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

      <Float floatIntensity={0.2} rotationIntensity={0.2}>
        <Text
          font='/bebas-neue-v9-latin-regular.woff'
          scale={0.8}
          maxWidth={3.5}
          lineHeight={0.75}
          textAlign='right'
          position={[-0.9, 2, -5]}
        >
          <meshBasicMaterial color='black' toneMapped={false} />
          Destroy !
        </Text>
      </Float>
    </group>
  );
}
