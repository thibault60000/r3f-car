import { Debug } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useState } from "react";
import Wheel from "./Wheel";
import Car from "./Car";
import { Vector3 } from "three";
import { CarConfig, WheelConfig } from "./Config";
import { useControls } from "leva";

export default function Player({ ...props }) {
  const { radius, width, height, front, back } = CarConfig;
  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();

  const { force, mass, maxBrake, steer } = useControls(
    "Car",
    {
      force: { value: 2500, min: 1000, max: 4000 },
      mass: { value: 450, min: 800, max: 1200 },
      maxBrake: { value: 1e2, min: 1e1, max: 1e3 },
      steer: { value: 0.85, min: 0.2, max: 0.95 },
    },
    {
      collapsed: true,
      color: "orange",
    }
  );

  const {
    suspensionStiffness,
    suspensionRestLength,
    maxSuspensionForce,
    maxSuspensionTravel,
    dampingRelaxation,
    dampingCompression,
  } = useControls(
    "Wheel",
    {
      suspensionStiffness: { value: 30, min: 10, max: 50 },
      suspensionRestLength: { value: 0.3, min: 0.1, max: 0.8 },
      maxSuspensionForce: { value: 1e4, min: 1e2, max: 1e6 },
      maxSuspensionTravel: { value: 0.3, min: 0.1, max: 0.9 },
      dampingRelaxation: { value: 10, min: 5, max: 15 },
      dampingCompression: { value: 4.4, min: 3.0, max: 5.5 },
    },
    {
      collapsed: true,
      color: "grey",
    }
  );

  const [smoothedCameraTarget] = useState(() => new Vector3());
  const [smoothedCameraPosition] = useState(() => new Vector3(6, 6, 6));

  const wheelInfo = {
    ...WheelConfig,
    suspensionStiffness,
    suspensionRestLength,
    maxSuspensionForce,
    maxSuspensionTravel,
    dampingRelaxation,
    dampingCompression,
  };

  const wheelInfo1 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [-width / 2, height, front],
  };
  const wheelInfo2 = {
    ...wheelInfo,
    isFrontWheel: true,
    chassisConnectionPointLocal: [width / 2, height, front],
  };
  const wheelInfo3 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [-width / 2, height, back],
  };
  const wheelInfo4 = {
    ...wheelInfo,
    isFrontWheel: false,
    chassisConnectionPointLocal: [width / 2, height, back],
  };

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1,
  }));

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const manageControls = (delta) => {
    const { forward, backward, left, right, restarter } = getKeys();
    const brake = !forward && !backward;

    // Forward & Backward
    for (let e = 2; e < 4; e++)
      api.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -1 : 1) : 0,
        2
      );
    // Left & Right
    for (let s = 0; s < 2; s++)
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );

    // Brake
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b);

    // Restart Player position
    if (restarter) {
      chassis.current.api.position.set(0, 0.5, 0);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
    }
  };

  const manageCamera = (camera, delta) => {
    // Camera follow user
    chassis.current.api.position.subscribe((position) => {
      // Target
      const cameraTarget = new Vector3();
      cameraTarget.copy(new Vector3(position[0], position[1], position[2]));
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
      camera.lookAt(cameraTarget);
      // Position
      const cameraPosition = new Vector3();
      cameraPosition.copy(new Vector3(position[0], position[1], position[2]));
      cameraPosition.z += 8;
      cameraPosition.y += 6;
      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      camera.position.copy(smoothedCameraPosition);
    });
  };

  useFrame(({ camera }, delta) => {
    manageControls(delta);
    manageCamera(camera, delta);
  });

  return (
    <group ref={vehicle} position={[0, -0.15, 0]}>
      {/* <Debug scale={3}> */}
      <Car
        mass={mass}
        ref={chassis}
        rotation={props.rotation}
        position={props.position}
        angularVelocity={props.angularVelocity}
      />
      {/* </Debug> */}

      <Wheel ref={wheel1} radius={radius} leftSide />
      <Wheel ref={wheel2} radius={radius} />
      <Wheel ref={wheel3} radius={radius} leftSide />
      <Wheel ref={wheel4} radius={radius} />
    </group>
  );
}
