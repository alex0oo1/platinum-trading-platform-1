
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const globeRef = useRef(null);
  const atmosphereRef = useRef(null);

  useFrame((state, delta) => {
    if (!globeRef.current) return;

    // Gentle automatic rotation.
    globeRef.current.rotation.y += delta * 0.035;

    // Follow the cursor smoothly.
    const targetX = state.pointer.y * 0.12;
    const targetZ = -state.pointer.x * 0.08;

    globeRef.current.rotation.x = THREE.MathUtils.damp(
      globeRef.current.rotation.x,
      targetX,
      2,
      delta
    );

    globeRef.current.rotation.z = THREE.MathUtils.damp(
      globeRef.current.rotation.z,
      targetZ,
      2,
      delta
    );

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group>
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshStandardMaterial
            color="#121d2a"
            metalness={0.55}
            roughness={0.65}
          />
        </mesh>

        <mesh scale={1.003}>
          <sphereGeometry args={[1.65, 48, 48]} />
          <meshBasicMaterial
            color="#c7a46a"
            wireframe
            transparent
            opacity={0.13}
            depthWrite={false}
          />
        </mesh>

        <mesh scale={1.035}>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshBasicMaterial
            color="#c7a46a"
            side={THREE.BackSide}
            transparent
            opacity={0.055}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={atmosphereRef}>
        <mesh>
          <torusGeometry args={[1.95, 0.008, 8, 128]} />
          <meshBasicMaterial
            color="#d8b575"
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function InteractiveGlobe() {
  return (
    <div
      className="interactive-globe"
      aria-label="Interactive decorative 3D globe"
    >
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[5, 3, 5]}
          intensity={2.2}
          color="#f2d6a4"
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={12}
          color="#436f9c"
        />

        <Suspense fallback={null}>
          <Earth />
          <Stars
            radius={70}
            depth={40}
            count={450}
            factor={2}
            saturation={0}
            fade
            speed={0.25}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.45}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI - 0.3}
        />
      </Canvas>

      <div className="globe-caption">
        <span className="globe-caption-dot" />
        EXPLORE GLOBAL MARKETS
      </div>
    </div>
  );
}
