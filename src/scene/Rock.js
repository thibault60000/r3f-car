import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/stones/stone1.gltf");

export default function Rock(props) {
  const { nodes, materials } = useGLTF("./models/stones/stone1.gltf");

  const [Rock1Ref] = useBox(() => ({
    type: "Static",
    args: [0.8, 2 * props.scale[1], 0.8],
    userData: { id: "stones1" },
    ...props,
  }));
  return (
    <group ref={Rock1Ref}>
      <group position={[0.8, 0, -0.2]} scale={props.scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.formationLarge_rock_1.geometry}
          material={materials["wood.009"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.formationLarge_rock_2.geometry}
          material={materials["sand.001"]}
        />
      </group>
    </group>
  );
}
