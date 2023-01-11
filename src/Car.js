import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

import { ColorManagement } from "three";
ColorManagement.legacyMode = false;

useGLTF.preload("./models/misc/car.gltf");

const Car = forwardRef(
  ({ args = [0.6, 0.6, 1.6], mass = 450, ...props }, ref) => {
    const { nodes, materials } = useGLTF("./models/misc/zombie_cars.glb");

    // api : https://github.com/pmndrs/use-cannon/tree/master/packages/react-three-cannon#returned-api

    const [, api] = useBox(
      () => ({
        mass,
        args,
        allowSleep: false,
        onCollide: (e) => console.log("Colission", e.body.userData),
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