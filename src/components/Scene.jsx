import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const groupRef = useRef(null);
  const sphereRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // Reduced movement amplitude for mobile
      const amplitude = isMobile ? 1 : 2;
      groupRef.current.position.x = Math.sin(time * 0.5) * amplitude;
      groupRef.current.position.y = Math.sin(time * 0.5) * Math.cos(time * 0.5) * amplitude;
    }

    if (sphereRef.current) {
      const bobAmount = isMobile ? 0.1 : 0.2;
      sphereRef.current.position.y = Math.sin(time * 0.5) * bobAmount;
    }
  });

  // Adjust sphere size and segment count based on device
  const sphereSize = isMobile ? 1.5 : 2;
  const sphereSegments = isMobile ? 32 : 64;
  
  // Adjust float animation intensity for mobile
  const floatSpeed = isMobile ? 1 : 1.5;
  const rotationIntensity = isMobile ? 0.3 : 0.5;
  const floatIntensity = isMobile ? 0.3 : 0.5;
  
  // Adjust distortion for mobile
  const distortAmount = isMobile ? 0.2 : 0.3;
  const distortSpeed = isMobile ? 1.5 : 2;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Float 
        speed={floatSpeed} 
        rotationIntensity={rotationIntensity} 
        floatIntensity={floatIntensity}
      >
        <Sphere 
          ref={sphereRef} 
          args={[sphereSize, sphereSegments, sphereSegments]} 
          position={[0, 0, 0]}
        >
          <MeshDistortMaterial
            color="#2A3FFB"
            attach="material"
            distort={distortAmount}
            speed={distortSpeed}
            roughness={0}
          />
        </Sphere>
      </Float>
    </group>
  );
}