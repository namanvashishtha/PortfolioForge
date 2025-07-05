import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Text, 
  Sphere,
  MeshDistortMaterial,
  ContactShadows,
  useTexture,
  Stars,
  Sparkles,
  Html,
  PerspectiveCamera,
  Plane
} from '@react-three/drei';
import * as THREE from 'three';

// Milky Way Galaxy Spiral Arms
function GalaxySpiralArms() {
  const spiralRef = useRef<THREE.Group>(null);
  const particleCount = 2000;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  // Create spiral galaxy structure
  for (let i = 0; i < particleCount; i++) {
    const t = (i / particleCount) * Math.PI * 8; // Multiple spiral turns
    const radius = 5 + (i / particleCount) * 25; // Expanding radius
    const spiralTightness = 0.3;
    
    // Create multiple spiral arms
    const armOffset = (i % 4) * (Math.PI / 2); // 4 spiral arms
    const x = Math.cos(t * spiralTightness + armOffset) * radius;
    const z = Math.sin(t * spiralTightness + armOffset) * radius;
    const y = (Math.random() - 0.5) * 2; // Thin galactic disk
    
    positions[i * 3] = x + (Math.random() - 0.5) * 3;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z + (Math.random() - 0.5) * 3;
    
    // Galaxy colors - blue-white core to red outer regions
    const distanceFromCenter = Math.sqrt(x * x + z * z) / 30;
    if (distanceFromCenter < 0.3) {
      // Galactic core - bright blue-white
      colors[i * 3] = 0.9 + Math.random() * 0.1;     // R
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1; // G
      colors[i * 3 + 2] = 1.0;                       // B
    } else if (distanceFromCenter < 0.6) {
      // Middle regions - yellow-white
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
    } else {
      // Outer regions - red giants and dust
      colors[i * 3] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.2 + Math.random() * 0.2;
    }
    
    sizes[i] = Math.random() * 0.3 + 0.1;
  }
  
  useFrame((state) => {
    if (spiralRef.current) {
      // Slow galactic rotation
      spiralRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <group ref={spiralRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Galactic Core - Supermassive Black Hole with Accretion Disk
function GalacticCore() {
  const coreRef = useRef<THREE.Group>(null);
  const blackHoleRef = useRef<THREE.Mesh>(null);
  const accretionDiskRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
    
    if (blackHoleRef.current) {
      // Black hole event horizon effect
      blackHoleRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1);
    }
    
    if (accretionDiskRef.current) {
      // Fast rotating accretion disk
      accretionDiskRef.current.rotation.z = state.clock.getElapsedTime() * 2;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Supermassive Black Hole */}
      <mesh 
        ref={blackHoleRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#1a1a2e"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Accretion Disk */}
      <mesh ref={accretionDiskRef}>
        <torusGeometry args={[3, 0.3, 8, 64]} />
        <MeshDistortMaterial
          color="#ff6b35"
          attach="material"
          distort={0.8}
          speed={4}
          roughness={0.1}
          metalness={0.7}
          transparent
          opacity={0.7}
          emissive="#ff6b35"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Outer accretion ring */}
      <mesh ref={accretionDiskRef}>
        <torusGeometry args={[4.5, 0.2, 8, 64]} />
        <MeshDistortMaterial
          color="#ffd23f"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.5}
          emissive="#ffd23f"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Gravitational lensing effect */}
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial
          color="#4a5568"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Cosmic Dust and Nebulae
function CosmicDust() {
  const dustRef = useRef<THREE.Points>(null);
  const particleCount = 800;
  
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  for (let i = 0; i < particleCount; i++) {
    // Distribute dust in nebula-like clouds
    const cloudCenter = [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 40
    ];
    
    positions[i * 3] = cloudCenter[0] + (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = cloudCenter[1] + (Math.random() - 0.5) * 4;
    positions[i * 3 + 2] = cloudCenter[2] + (Math.random() - 0.5) * 15;
    
    // Nebula colors - deep space purples, blues, and magentas
    const nebulaType = Math.random();
    if (nebulaType < 0.3) {
      // Purple nebula
      colors[i * 3] = 0.4 + Math.random() * 0.4;     // R
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.6 + Math.random() * 0.4; // B
    } else if (nebulaType < 0.6) {
      // Blue nebula
      colors[i * 3] = 0.1 + Math.random() * 0.3;     // R
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // G
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3; // B
    } else {
      // Magenta nebula
      colors[i * 3] = 0.6 + Math.random() * 0.4;     // R
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.2; // G
      colors[i * 3 + 2] = 0.5 + Math.random() * 0.4; // B
    }
    
    sizes[i] = Math.random() * 0.4 + 0.1;
  }
  
  useFrame((state) => {
    if (dustRef.current) {
      // Very slow drift like cosmic dust
      dustRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
      
      // Subtle floating motion
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() * 0.2 + i * 0.01) * 0.005;
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Distant Star Clusters and Globular Clusters
function StarClusters() {
  const clusters = [];
  const numClusters = 8;
  
  for (let c = 0; c < numClusters; c++) {
    const clusterCenter = [
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 60
    ];
    
    const starsInCluster = 50;
    const positions = new Float32Array(starsInCluster * 3);
    const colors = new Float32Array(starsInCluster * 3);
    const sizes = new Float32Array(starsInCluster);
    
    for (let i = 0; i < starsInCluster; i++) {
      // Spherical distribution around cluster center
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = clusterCenter[0] + radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = clusterCenter[1] + radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = clusterCenter[2] + radius * Math.cos(phi);
      
      // Old, red giant stars in globular clusters
      colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.2 + Math.random() * 0.2; // B
      
      sizes[i] = Math.random() * 0.2 + 0.1;
    }
    
    clusters.push({ positions, colors, sizes, center: clusterCenter });
  }
  
  return (
    <group>
      {clusters.map((cluster, index) => (
        <points key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={50}
              array={cluster.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={50}
              array={cluster.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={50}
              array={cluster.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            vertexColors
            transparent
            opacity={0.7}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}
    </group>
  );
}

// Floating Asteroids and Space Debris
function SpaceDebris() {
  const debrisRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={debrisRef}>
      {/* Various asteroid-like objects */}
      <Float rotationIntensity={0.2} floatIntensity={0.5} speed={1}>
        <mesh position={[-15, 5, -8]}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#4a5568"
            roughness={0.9}
            metalness={0.1}
            emissive="#2d3748"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      <Float rotationIntensity={0.3} floatIntensity={0.7} speed={1.2}>
        <mesh position={[18, -3, 12]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color="#2d3748"
            roughness={0.8}
            metalness={0.2}
            emissive="#1a202c"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      
      <Float rotationIntensity={0.4} floatIntensity={0.6} speed={0.8}>
        <mesh position={[-12, -7, 15]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#718096"
            roughness={0.7}
            metalness={0.3}
            emissive="#4a5568"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

// Main Milky Way Galaxy Experience
export default function InteractiveHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setTimeout(() => setIsLoaded(true), 1000);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[700px] rounded-2xl overflow-hidden bg-black shadow-2xl">
      <Canvas 
        camera={{ position: [0, 5, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 1);
        }}
      >
        {/* Deep space lighting - very minimal */}
        <ambientLight intensity={0.05} color="#0a0a2e" />
        
        {/* Galactic core light */}
        <pointLight position={[0, 0, 0]} intensity={2} color="#ff6b35" distance={30} />
        
        {/* Distant starlight */}
        <pointLight position={[50, 20, -30]} intensity={0.5} color="#ffffff" distance={100} />
        <pointLight position={[-40, -15, 25]} intensity={0.3} color="#4169e1" distance={80} />
        
        {/* Deep space background stars */}
        <Stars 
          radius={200} 
          depth={100} 
          count={3000} 
          factor={6} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {/* Milky Way Galaxy Components */}
        <GalaxySpiralArms />
        <GalacticCore />
        <CosmicDust />
        <StarClusters />
        <SpaceDebris />
        
        {/* Subtle cosmic sparkles */}
        <Sparkles 
          count={30} 
          scale={[100, 100, 100]} 
          size={2} 
          speed={0.2}
          color="#ffffff"
          opacity={0.3}
        />
        
        <Environment preset="night" />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.1}
          minDistance={10}
          maxDistance={100}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
        />
      </Canvas>
      
      {/* Galactic overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`text-center text-white z-10 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-16">
            <div className="text-8xl font-bold mb-8 bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent">
              ✦ Forge ✦
            </div>
            <div className="text-4xl font-light mb-6 text-gray-100">
              Your Portfolio in the Cosmos
            </div>
            <div className="text-xl text-gray-300 max-w-lg mx-auto mb-6">
              Navigate through the Milky Way and create portfolios among the stars
            </div>
            <div className="text-sm text-gray-400 font-mono tracking-wider">
              ◦ ◦ ◦ DEEP SPACE EDITION ◦ ◦ ◦
            </div>
          </div>
        </div>
      </div>
      
      {/* Cosmic cursor effect */}
      <div 
        className="absolute w-3 h-3 bg-white rounded-full pointer-events-none opacity-80 transition-all duration-100 ease-out"
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(-mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)',
        }}
      />
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl border border-gray-800 shadow-inner" 
           style={{ 
             boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.9)'
           }} 
      />
      
      {/* Navigation hint */}
      <div className="absolute bottom-4 left-4 text-gray-500 text-sm">
        <div className="flex items-center space-x-2">
          <span>🖱️ Drag to explore</span>
          <span>•</span>
          <span>🔍 Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}