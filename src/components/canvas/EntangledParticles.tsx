'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Helper to generate sphere particles
function generateSphereParticles(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}

export function EntangledParticles({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const blueSphereRef = useRef<THREE.Points>(null);
  const redSphereRef = useRef<THREE.Points>(null);
  const ringsRef = useRef<THREE.Group>(null);

  const particleCount = 3000;
  const radius = 1.2;
  
  const bluePositions = useMemo(() => generateSphereParticles(particleCount, radius), []);
  const redPositions = useMemo(() => generateSphereParticles(particleCount, radius), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base slow rotation
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      
      // Rotate based on scroll
      groupRef.current.rotation.y += (scrollProgress * Math.PI * 2 - groupRef.current.rotation.y) * 0.1;
      
      // Zoom effect based on scroll
      const targetZ = scrollProgress * 5;
      groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1;
    }

    if (blueSphereRef.current) {
      blueSphereRef.current.rotation.x -= delta * 0.15;
      blueSphereRef.current.rotation.y += delta * 0.2;
    }
    if (redSphereRef.current) {
      redSphereRef.current.rotation.x += delta * 0.15;
      redSphereRef.current.rotation.y -= delta * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.5;
      ringsRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Blue / Cyan Particle Sphere */}
      <Points ref={blueSphereRef} positions={bluePositions} position={[-2, 0, 0]}>
        <PointMaterial
          transparent
          color="#00d2ff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Red / Magenta Particle Sphere */}
      <Points ref={redSphereRef} positions={redPositions} position={[2, 0, 0]}>
        <PointMaterial
          transparent
          color="#ff1a66"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Connecting Energy Waves / Rings */}
      <group ref={ringsRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (Math.PI / 4) * i]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#00d2ff" : "#ff1a66"} 
              transparent 
              opacity={0.3} 
              blending={THREE.AdditiveBlending} 
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
