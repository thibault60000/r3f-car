const WHEEL_RADIUS = 0.35;

export const CarConfig = {
  radius: WHEEL_RADIUS,
  width: 0.85,
  height: -0.08,
  front: 0.7,
  back: -0.6,
  steer: 0.85,
  force: 2500,
  mass: 800,
  maxBrake: 1e2,
};

export const WheelConfig = {
  radius: WHEEL_RADIUS,
  directionLocal: [0, -1, 0],
  // suspensionStiffness: 30,
  // suspensionRestLength: 0.3,
  // maxSuspensionForce: 1e4,
  // maxSuspensionTravel: 0.3,
  // dampingRelaxation: 10,
  // dampingCompression: 4.4,
  axleLocal: [-1, 0, 0],
  chassisConnectionPointLocal: [1, 0, 1],
  useCustomSlidingRotationalSpeed: true,
  customSlidingRotationalSpeed: -30,
  frictionSlip: 2,
};
