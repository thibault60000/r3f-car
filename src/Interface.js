import { useKeyboardControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";

import useGame from "./stores/useGame.js";

export default function Interface() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const restarter = useKeyboardControls((state) => state.restarter);

  const status = useGame((state) => state.status);
  const restart = useGame((state) => state.restart);
  const timeRef = useRef();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();
      let elapsedTime = 0;

      if (state.status === "playing") {
        elapsedTime = (Date.now() - state.startTime) / 1000;
      } else if (state.status === "ending") {
        elapsedTime = (state.endTime - state.startTime) / 1000;
      }

      elapsedTime = elapsedTime.toFixed(2);
      if (timeRef.current) timeRef.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect;
    };
  }, []);

  return (
    <div className='interface'>
      {/* Controls */}
      <div className='controls'>
        {/* Movements */}
        <div className='blocs'>
          <div className='raw'>
            <div className={`key ${forward ? "active" : ""}`}>Z</div>
          </div>
          <div className='raw'>
            <div className={`key ${left ? "active" : ""}`}>Q</div>
            <div className={`key ${backward ? "active" : ""}`}>S</div>
            <div className={`key ${right ? "active" : ""}`}>D</div>
          </div>
          <div className='raw'>
            <p> Movements </p>
          </div>
        </div>
        {/* System */}
        <div className='blocs'>
          <div className='raw'>
            <div className={`key ${restarter ? "active" : ""}`}>R</div>
          </div>
          <div className='raw'>
            <p> Restart </p>
          </div>
        </div>
      </div>
    </div>
  );
}
