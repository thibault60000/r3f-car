import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/grass.gltf");

export default function Grass(props) {
  const { nodes, materials } = useGLTF("./models/misc/grass.gltf");

  const [GrassRef] = useBox(() => ({
    type: "Static",
    args: [0.5, props.scale[1], 0.5],
    userData: { id: "grass" },
    ...props,
  }));
  return (
    <group ref={GrassRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plant.geometry}
        material={materials["leaves.005"]}
        scale={0.69}
      />
    </group>
  );
}
