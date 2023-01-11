import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/craft.gltf");

export default function Craft(props) {
  const { nodes, materials } = useGLTF("./models/misc/craft.gltf");

  const [BricksRef] = useBox(() => ({
    mass: 2,
    args: [0.7, props.scale[1] * 1, 0.7],
    ...props,
  }));
  return (
    <group ref={BricksRef} userData={{ id: "craft" }}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials["BrownDark.057"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013_1.geometry}
          material={materials["Metal.089"]}
        />
      </group>
    </group>
  );
}
