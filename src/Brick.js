import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/bricks.gltf");

export default function Brick(props) {
  const { nodes, materials } = useGLTF("./models/misc/bricks.gltf");

  const [BricksRef] = useBox(() => ({
    type: "Static",
    args: [0.5, props.scale[1], 0.5],
    ...props,
  }));
  return (
    <group ref={BricksRef} userData={{ id: "bricks" }}>
      <mesh
        scale={props.scale}
        castShadow
        receiveShadow
        geometry={nodes.bricks.geometry}
        material={materials["Stone.014"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
