import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

useGLTF.preload("./models/misc/zombie_cars.glb");

const Car = forwardRef(
  ({ args = [0.6, 0.6, 1.6], mass = 500, ...props }, ref) => {
    const { nodes, materials } = useGLTF("./models/misc/zombie_cars.glb");

    // api : https://github.com/pmndrs/use-cannon/tree/master/packages/react-three-cannon#returned-api

    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        onCollide: (e) => console.log("Colission", e.body),
        ...props,
      }),
      ref
    );
    return (
      <mesh ref={ref} api={api}>
        <group scale={0.1}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder018_Cylinder007.geometry}
            material={materials.Car}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder018_Cylinder007_1.geometry}
            material={materials.Windshield}
          />
        </group>
      </mesh>
    );
  }
);

export default Car;
