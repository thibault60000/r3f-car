import { useGLTF, useAnimations } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useControls } from "leva";
import { forwardRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

useGLTF.preload("./models/characters/korrigan.gltf");

const Korrigan = forwardRef(({ setKorrigan, ...props }, KorriganRef) => {
  const { nodes, materials, animations } = useGLTF(
    "./models/characters/korrigan.gltf"
  );

  const [, api] = useBox(
    () => ({
      type: "Kinematic",
      args: [0.2, props.scale[1], 0.2],
      userData: { id: "korrigan" },
      onCollide: (e) => {
        console.log("Korrian hit", e.body.userData.id);
        setKorrigan({
          isAlive: false,
        });
      },
      ...props,
    }),
    KorriganRef
  );

  const { names, actions } = useAnimations(animations, KorriganRef);

  const { name } = useControls("Gobelin Animation", {
    name: { options: names, value: "pose_chapeau" }, // "pose_chapeau | course_chapeau"
  });

  useEffect(() => {
    const action = actions[name];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [name]);

  useFrame(() => {});

  return (
    <group ref={KorriganRef}>
      <group name='Scene' scale={1.4}>
        <group name='Armature_chapeau' rotation={[0, 0.01, 0]}>
          <primitive object={nodes.root} />
          <skinnedMesh
            name='Chapeau'
            geometry={nodes.Chapeau.geometry}
            material={materials["color_main.014"]}
            skeleton={nodes.Chapeau.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

export default Korrigan;
