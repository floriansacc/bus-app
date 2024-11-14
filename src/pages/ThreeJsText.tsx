import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { SphereParams } from "../models/three-js/ThreeJsModels";
import SphereComponent from "../components/three-js/SphereComponent";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function ThreeJsText() {
  const [initialPos, setInitialPos] = useState<{
    x: number | null;
    y: number | null;
  }>();

  const sphereGrid: SphereParams[] = [];
  for (let j = -5; j <= 5; j++) {
    for (let i = -5; i <= 5; i++)
      sphereGrid.push({
        x: i * 5,
        y: j * 5,
        coeff: Math.floor(Math.random() * 7),
      });
  }

  const getInitialPos = (e: React.MouseEvent): void => {
    const centerX = e.clientX;
    const centerY = e.clientY;
    setInitialPos({ x: centerX, y: centerY });
    window.removeEventListener("mousemove", getInitialPos as any);
  };

  useEffect(() => {
    // Listen for mouse movement on the entire window
    window.addEventListener("mousemove", getInitialPos as any);
    return () => window.removeEventListener("mousemove", getInitialPos as any);
  }, [window.innerHeight, window.innerWidth]);

  return (
    <div className="h-screen w-screen bg-gray-800">
      <Canvas style={{ height: "100%" }} className="h-80">
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>
        <ambientLight intensity={1} />
        <directionalLight color={"white"} position={[0, 0, 5]} />
        {sphereGrid.map((e) => (
          <SphereComponent
            x={e.x}
            y={e.y}
            color={e.color}
            depth={e.depth}
            coeff={e.coeff}
            initialPos={initialPos}
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}
