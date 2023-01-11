import create from "zustand";

import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      status: "ready", // ["ready", "playing", "ending"]
      startTime: 0,
      endTime: 0,

      // Functions
      start: () => {
        set((state) => {
          if (state.status === "ready")
            return { status: "playing", startTime: Date.now() };
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.status === "playing")
            return { status: "ending", endTime: Date.now() };
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.status === "playing" || state.status === "ending")
            return { status: "ready" };
          return {};
        });
      },
    };
  })
);
