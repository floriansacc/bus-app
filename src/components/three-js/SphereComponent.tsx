import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SphereParams } from "../../models/three-js/ThreeJsModels";

export default function SphereComponent(params: SphereParams) {
  const [mousePos, setMousePos] = useState<THREE.Vector3>(new THREE.Vector3());
  const [isHover, setIsHover] = useState<boolean>(false);
  const [color] = useState(new THREE.Color(params.color ?? "yellow"));

  const ref = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (!params?.initialPos?.x) return;
    const initialPosX = params?.initialPos?.x ?? 0;
    const initialPosY = params?.initialPos?.y ?? 0;
    const coeff = (params.coeff ?? 1) + 1;

    const x: number =
      -((e.clientX - initialPosX) / window.innerWidth) * 15 * coeff;
    const y: number =
      ((e.clientY - initialPosY) / window.innerHeight) * 15 * coeff;
    setMousePos(new THREE.Vector3(x, y, 0.5));
  };

  useEffect(() => {
    // Listen for mouse movement on the entire window
    window.addEventListener("mousemove", handleMouseMove as any);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove as any);
  }, [gl, params.initialPos]);

  useFrame(() => {
    if (ref.current && ref2.current) {
      const vector = mousePos.clone().unproject(camera); // Convert NDC to world space
      vector.x += params.x ?? 0;
      vector.y += params.y ?? 0;
      vector.z = params.depth ?? -50; // Adjust z-position to control depth
      ref.current.position.lerp(vector, 0.05); // Smooth interpolation
      ref2.current.position.lerp(vector, 0.05); // Smooth interpolation

      // Interpolate color smoothly
      const targetColor = new THREE.Color(
        isHover ? "white" : (params.color ?? "yellow"),
      );
      color.lerp(targetColor, 0.1); // Smoothly blend toward target color
      (ref.current.material as THREE.MeshPhysicalMaterial).color.set(color);
      (ref2.current.material as THREE.MeshPhysicalMaterial).color.set(color);
    }
  });

  return (
    <>
      {/* Invisible sphere for larger interaction area */}
      <mesh
        ref={ref2}
        onPointerOver={() => setIsHover(true)}
        onPointerOut={() => setIsHover(false)}
        scale={7} // Adjust this scale factor to control interaction radius
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial transparent opacity={0} />
      </mesh>

      {/* Actual sphere with animated color */}
      <mesh ref={ref}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          clearcoatRoughness={0.5}
          clearcoat={0.5}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </>
  );
}
