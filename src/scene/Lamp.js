import { PivotControls, SpotLight, useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/lamp.gltf");

export default function Lamp(props) {
  const { nodes, materials } = useGLTF("./models/misc/lamp.gltf");

  const [BricksRef] = useBox(() => ({
    type: "Static",
    args: [0.5, 3, 0.5],
    userData: { id: "lamp" },
    ...props,
  }));
  return (
    <group ref={BricksRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder096.geometry}
        material={materials["Black.012"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder096_1.geometry}
        material={materials["Yellow.007"]}
      />
    </group>
  );
}
