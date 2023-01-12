import { useGLTF, useAnimations } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { useControls } from "leva";
import { forwardRef, useEffect } from "react";

useGLTF.preload("./models/characters/korrigan.gltf");

const Korrigan = forwardRef((props, KorriganRef) => {
  const { nodes, materials, animations } = useGLTF(
    "./models/characters/korrigan.gltf"
  );

  /*
   *  animations: [
   *    { blendMode : 2500, duration:  0.875, name: "course_chapeau" }
   *    { blendMode : 2500, duration: 14.625, name: "pose_chapeau" }
   * ]
   */

  const [, api] = useBox(
    () => ({
      type: "Static",
      args: [0.2, props.scale[1], 0.2],
      userData: { id: "korrigan" },
      onCollide: (e) => console.log("Korrian hit", e.body),
      ...props,
    }),
    KorriganRef
  );

  const { names, actions } = useAnimations(animations, KorriganRef);

  const { name } = useControls("Gobelin Animation", {
    name: { options: names },
  });

  useEffect(() => {
    console.log("Korrigan ref", KorriganRef.current);
    const action = actions[name];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [name]);

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
