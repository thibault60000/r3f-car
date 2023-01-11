import { Debug } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useRaycastVehicle } from "@react-three/cannon";
import { useKeyboardControls } from "@react-three/drei";
import { useRef, useState } from "react";
import Wheel from "./Wheel";
import Car from "./Car";
import { Vector3 } from "three";

export default function Player({
  radius = 0.35,
  width = 0.85,
  height = -0.08,
  front = 0.7,
  back = -0.6,
  steer = 0.85,
  force = 2500,
  mass = 800,
  maxBrake = 1e2,
  ...props
}) {
  const chassis = useRef();
  const wheel1 = useRef();
  const wheel2 = useRef();
  const wheel3 = useRef();
  const wheel4 = useRef();

  const [smoothedCameraTarget] = useState(() => new Vector3());
  const [smoothedCameraPosition] = useState(() => new Vector3(6, 6, 6));

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2,
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

  useFrame(({ camera }, delta) => {
    const { forward, backward, left, right, restarter } = getKeys();
    const brake = !forward && !backward;

    for (let e = 2; e < 4; e++)
      api.applyEngineForce(
        forward || backward ? force * (forward && !backward ? -1 : 1) : 0,
        2
      );
    for (let s = 0; s < 2; s++)
      api.setSteeringValue(
        left || right ? steer * (left && !right ? 1 : -1) : 0,
        s
      );
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b);

    // Frein moteur
    api.setBrake(brake ? maxBrake : 0, 2);
    api.setBrake(brake ? maxBrake : 0, 3);

    // Restart Player position
    if (restarter) {
      chassis.current.api.position.set(0, 0.5, 0);
      chassis.current.api.velocity.set(0, 0, 0);
      chassis.current.api.angularVelocity.set(0, 0.5, 0);
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0);
    }

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
  });

  return (
    <group ref={vehicle} position={[0, 0, 0]}>
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
