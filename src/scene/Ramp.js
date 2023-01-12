import { useBox } from "@react-three/cannon";
import { Float, Text } from "@react-three/drei";

export default function Floor(props) {
  const [ref] = useBox(() => ({
    type: "Static",
    friction: 1,
    args: [3, 0.3, 3],
    userData: { id: "ramp" },
    ...props,
  }));

  return (
    <group>
      <mesh ref={ref} receiveShadow userData={{ id: "ramp" }}>
        <boxGeometry args={[3, 0.3, 3]} />
        <meshStandardMaterial color='red' />
      </mesh>
      <Float floatIntensity={0.2} rotationIntensity={0.2}>
        <Text
          font='/bebas-neue-v9-latin-regular.woff'
          scale={1}
          maxWidth={2.5}
          lineHeight={0.75}
          textAlign='right'
          position={[props.position[0], 1.6, props.position[2] - 1]}
        >
          <meshBasicMaterial color='black' toneMapped={false} />
          Jump !
        </Text>
      </Float>
    </group>
  );
}
