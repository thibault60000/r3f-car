import { useSphere } from "@react-three/cannon";

export default function Ball(props) {
  const [BallRef] = useSphere(() => ({
    args: [0.5, 0.5, 0.5],
    mass: 15,
    userData: { id: "ball" },
    ...props,
  }));
  return (
    <group ref={BallRef}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial flatShading color='orange' />
      </mesh>
    </group>
  );
}
