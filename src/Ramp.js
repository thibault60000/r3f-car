import { useBox } from "@react-three/cannon";

export default function Ramp(props) {
  const [rampRef] = useBox(() => ({
    type: "Static",
    material: "ground",
    position: [-3, 0, 2],
    rotation: [0, 0, -Math.PI / 6],
    args: [2, 0.2, 2],
    ...props,
  }));

  return (
    <mesh ref={rampRef} userData={{ id: "ramp" }}>
      <boxGeometry args={[3, 0.2, 4]} />
      <meshStandardMaterial color='red' />
    </mesh>
  );
}
