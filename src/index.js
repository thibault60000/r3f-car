import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";

const root = ReactDOM.createRoot(document.querySelector("#root"));

const mapKeys = [
  {
    name: "forward",
    keys: ["ArrowUp", "KeyW"],
  },
  {
    name: "backward",
    keys: ["ArrowDown", "KeyS"],
  },
  {
    name: "left",
    keys: ["ArrowLeft", "KeyA"],
  },
  {
    name: "right",
    keys: ["ArrowRight", "KeyD"],
  },
  {
    name: "restarter",
    keys: ["KeyR"],
  },
  {
    name: "jump",
    keys: ["Space"],
  },
];

root.render(
  <KeyboardControls map={mapKeys}>
    <Canvas dpr={[1, 2]} shadows flat camera={{ fov: 45, near: 0.1, far: 200 }}>
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
