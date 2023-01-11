import { usePlane } from "@react-three/cannon";

export default function Floor(props) {
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    friction: 1,
    ...props,
  }));

  return (
    <mesh
      ref={ref}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      userData={{ id: "floor" }}
    >
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  );
}
