import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

// Interactive 3D component for portfolio items
function PortfolioItem({ position, color, text, onClick, isSelected }: { 
  position: [number, number, number], 
  color: string, 
  text: string,
  onClick: () => void,
  isSelected: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
        <mesh 
          ref={meshRef} 
          onClick={onClick}
          scale={isSelected ? 1.2 : 1}
        >
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.3} 
            metalness={0.7}
            emissive={isSelected ? color : '#000000'}
            emissiveIntensity={isSelected ? 0.5 : 0}
          />
        </mesh>
        <Text
          position={[0, 0, 0.15]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Float>
    </group>
  );
}

// Main scene component
export default function ThreeScene({ onSelectItem }: { onSelectItem: (id: number) => void }) {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  const portfolioItems = [
    { id: 1, position: [-2, 0, 0] as [number, number, number], color: '#4f46e5', text: 'Portfolio 1' },
    { id: 2, position: [0, 0, 0] as [number, number, number], color: '#7c3aed', text: 'Portfolio 2' },
    { id: 3, position: [2, 0, 0] as [number, number, number], color: '#2563eb', text: 'Portfolio 3' },
  ];

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
    onSelectItem(id);
  };

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {portfolioItems.map((item) => (
          <PortfolioItem 
            key={item.id}
            position={item.position}
            color={item.color}
            text={item.text}
            onClick={() => handleItemClick(item.id)}
            isSelected={selectedItem === item.id}
          />
        ))}
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={1.5} 
          far={1.5} 
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}