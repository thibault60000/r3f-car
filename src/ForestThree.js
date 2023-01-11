import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import { ColorManagement } from "three";
ColorManagement.legacyMode = false;

useGLTF.preload("./models/threes/three1.gltf");

export default function ForestThree(props) {
  const { nodes, materials } = useGLTF("./models/threes/three1.gltf");

  const [Three1Ref] = useBox(() => ({
    type: "Static",
    args: [0.5, 2.5, 0.5],
    ...props,
  }));
  return (
    <group ref={Three1Ref} userData={{ id: "three1" }}>
      <group position={[0.8, 0, -0.8]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Group_152.geometry}
          material={materials["wood.011"]}
          position={[-0.65, 0, 0.59]}
          scale={0.77}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Group_154.geometry}
          material={materials["leaves.001"]}
          position={[0, 1.72, 0]}
        />
      </group>
    </group>
  );
}
