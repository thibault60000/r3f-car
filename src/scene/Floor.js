import { usePlane } from "@react-three/cannon";
import { GradientTexture } from "@react-three/drei";

export default function Floor(props) {
  const [ref] = usePlane(() => ({
    type: "Static",
    material: "ground",
    friction: 1,
    userData: { id: "ground" },
    ...props,
  }));

  return (
    <mesh
      ref={ref}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      userData={{ id: "floor" }}
    >
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial>
        <GradientTexture
          stops={[0, 0.8, 1]}
          colors={["#F4661B", "#FFA500", "#FEA347", "#E67E30"]}
          size={100}
        />
      </meshStandardMaterial>
    </mesh>
  );
}
