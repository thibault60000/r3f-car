import { Debug, useBox } from "@react-three/cannon";
import { Text, Text3D } from "@react-three/drei";

export default function Credits(props) {
  const [CreditsRef] = useBox(() => ({
    mass: 5,
    args: [3, 0.5, 0.5],
    userData: { id: "credits" },
    ...props,
  }));
  return (
    <group ref={CreditsRef}>
      <Text3D
        castShadow
        position-x={-1}
        font='/helvetiker_regular.typeface.json'
        scale={0.2}
        maxWidth={10}
        lineHeight={0.5}
        textAlign='center'
      >
        <meshBasicMaterial color='ivory' />
        {props.text}
      </Text3D>
    </group>
  );
}
