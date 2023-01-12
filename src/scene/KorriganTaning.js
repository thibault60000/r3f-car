import { useGLTF, useAnimations } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useControls } from "leva";
import { forwardRef, useEffect } from "react";

useGLTF.preload("./models/characters/korrigan-taning.gltf");

const KorriganTaning = forwardRef(
  ({ setKorriganTaning, ...props }, KorriganTaningRef) => {
    const { nodes, materials, animations } = useGLTF(
      "./models/characters/korrigan-taning.gltf"
    );

    const [, api] = useBox(
      () => ({
        type: "Kinematic",
        args: [0.2, props.scale[1], 0.2],
        userData: { id: "korrigan taning" },
        onCollide: (e) => {
          console.log("Korrian hit", e.body.userData.id);
          setKorriganTaning({
            isAlive: false,
          });
        },
        ...props,
      }),
      KorriganTaningRef
    );

    const { names, actions } = useAnimations(animations, KorriganTaningRef);

    const { name } = useControls(
      "Gobelin Femelle Animation",
      {
        name: { options: names, value: "pose_femme" },
      },
      {
        collapsed: true,
        color: "green",
      }
    );

    useEffect(() => {
      const action = actions[name];
      action.reset().fadeIn(0.5).play();

      return () => {
        action.fadeOut(0.5);
      };
    }, [name]);

    return (
      <group ref={KorriganTaningRef}>
        <group name='Scene'>
          <group
            name='Armature_femme'
            rotation={[0.12, -0.06, -0.04]}
            scale={0.25}
          >
            <primitive object={nodes.root} />
            <skinnedMesh
              castShadow
              name='Femme'
              geometry={nodes.Femme.geometry}
              material={materials["color_main.004"]}
              skeleton={nodes.Femme.skeleton}
            />
          </group>
        </group>
      </group>
    );
  }
);

export default KorriganTaning;
