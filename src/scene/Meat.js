import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/meat.gltf");

export default function Meat(props) {
  const { nodes, materials } = useGLTF("./models/misc/meat.gltf");

  const [MeatRef] = useBox(() => ({
    mass: 3,
    args: [0.5, props.scale[1], 0.5],
    userData: { id: "meat" },
    ...props,
  }));
  return (
    <group ref={MeatRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_meatCooked.geometry}
        material={materials.brownLight}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_meatCooked_1.geometry}
        material={materials.green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_meatCooked_2.geometry}
        material={materials.brown}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_meatCooked_3.geometry}
        material={materials.brownDark}
      />
    </group>
  );
}
