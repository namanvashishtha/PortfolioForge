import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  Text, 
  Html,
  useTexture,
  Sphere,
  Box,
  Plane
} from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Component types for the portfolio
type ComponentType = 'header' | 'hero' | 'about' | 'projects' | 'skills' | 'contact';

interface PortfolioComponent {
  id: string;
  type: ComponentType;
  position: [number, number, number];
  color: string;
  title: string;
  isSelected: boolean;
}

// 3D Component representation
function Component3D({ 
  component, 
  onClick, 
  onDrag 
}: { 
  component: PortfolioComponent;
  onClick: (id: string) => void;
  onDrag: (id: string, position: [number, number, number]) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current && !isDragging) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      if (component.isSelected) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05);
      }
    }
  });

  const getGeometry = () => {
    switch (component.type) {
      case 'header':
        return <boxGeometry args={[2, 0.5, 0.2]} />;
      case 'hero':
        return <boxGeometry args={[3, 2, 0.2]} />;
      case 'about':
        return <cylinderGeometry args={[0.8, 0.8, 0.2, 8]} />;
      case 'projects':
        return <boxGeometry args={[2.5, 1.5, 0.2]} />;
      case 'skills':
        return <sphereGeometry args={[0.8, 16, 16]} />;
      case 'contact':
        return <octahedronGeometry args={[0.8]} />;
      default:
        return <boxGeometry args={[1, 1, 0.2]} />;
    }
  };

  return (
    <group position={component.position}>
      <Float 
        rotationIntensity={component.isSelected ? 0.5 : 0.2} 
        floatIntensity={component.isSelected ? 1 : 0.5} 
        speed={component.isSelected ? 3 : 1}
      >
        <mesh 
          ref={meshRef}
          onClick={() => onClick(component.id)}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={component.isSelected ? 1.2 : hovered ? 1.1 : 1}
        >
          {getGeometry()}
          <meshStandardMaterial 
            color={component.color}
            roughness={0.3}
            metalness={0.7}
            emissive={component.isSelected ? component.color : '#000000'}
            emissiveIntensity={component.isSelected ? 0.3 : 0}
            transparent
            opacity={hovered ? 0.9 : 0.8}
          />
        </mesh>
        
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {component.title}
        </Text>
        
        {component.isSelected && (
          <Html distanceFactor={10}>
            <div className="bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap">
              <strong>{component.type.toUpperCase()}</strong>
              <br />
              {component.title}
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// Grid helper component
function Grid() {
  return (
    <gridHelper 
      args={[20, 20, '#444444', '#222222']} 
      position={[0, -2, 0]} 
    />
  );
}

// Main 3D Portfolio Editor
export default function PortfolioEditor3D({ 
  onComponentSelect,
  onComponentUpdate 
}: { 
  onComponentSelect: (componentId: string) => void;
  onComponentUpdate: (componentId: string, updates: any) => void;
}) {
  const [components, setComponents] = useState<PortfolioComponent[]>([
    {
      id: '1',
      type: 'header',
      position: [0, 2, 0],
      color: '#4f46e5',
      title: 'Header',
      isSelected: false
    },
    {
      id: '2',
      type: 'hero',
      position: [0, 0, 0],
      color: '#7c3aed',
      title: 'Hero Section',
      isSelected: false
    },
    {
      id: '3',
      type: 'about',
      position: [-3, 0, 0],
      color: '#2563eb',
      title: 'About',
      isSelected: false
    },
    {
      id: '4',
      type: 'projects',
      position: [3, 0, 0],
      color: '#059669',
      title: 'Projects',
      isSelected: false
    },
    {
      id: '5',
      type: 'skills',
      position: [-1.5, -2, 0],
      color: '#dc2626',
      title: 'Skills',
      isSelected: false
    },
    {
      id: '6',
      type: 'contact',
      position: [1.5, -2, 0],
      color: '#ea580c',
      title: 'Contact',
      isSelected: false
    }
  ]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const handleComponentClick = (id: string) => {
    setComponents(prev => prev.map(comp => ({
      ...comp,
      isSelected: comp.id === id
    })));
    setSelectedComponent(id);
    onComponentSelect(id);
  };

  const handleComponentDrag = (id: string, position: [number, number, number]) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, position } : comp
    ));
    onComponentUpdate(id, { position });
  };

  const addComponent = (type: ComponentType) => {
    const newComponent: PortfolioComponent = {
      id: Date.now().toString(),
      type,
      position: [Math.random() * 4 - 2, Math.random() * 2, 0],
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      isSelected: false
    };
    setComponents(prev => [...prev, newComponent]);
  };

  const removeComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <div className="w-full h-full flex">
      {/* 3D Canvas */}
      <div className="flex-1 h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1} 
            intensity={1} 
            castShadow 
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Grid />
          
          {components.map((component) => (
            <Component3D
              key={component.id}
              component={component}
              onClick={handleComponentClick}
              onDrag={handleComponentDrag}
            />
          ))}
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2} 
            far={2} 
          />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Canvas>
      </div>

      {/* Control Panel */}
      <div className="w-80 p-4 bg-white border-l">
        <h3 className="text-lg font-semibold mb-4">Portfolio Components</h3>
        
        {/* Add Component Buttons */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Add Components</h4>
          <div className="grid grid-cols-2 gap-2">
            {(['header', 'hero', 'about', 'projects', 'skills', 'contact'] as ComponentType[]).map((type) => (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => addComponent(type)}
                className="text-xs"
              >
                + {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Components</h4>
          {components.map((component) => (
            <Card 
              key={component.id}
              className={`cursor-pointer transition-colors ${
                component.isSelected ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleComponentClick(component.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: component.color }}
                    />
                    <span className="text-sm font-medium">{component.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeComponent(component.id);
                    }}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {component.type} • Position: ({component.position.map(p => p.toFixed(1)).join(', ')})
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Component Details */}
        {selectedComponent && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Selected Component</h4>
            {(() => {
              const selected = components.find(c => c.id === selectedComponent);
              return selected ? (
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>Type:</strong> {selected.type}
                  </div>
                  <div className="text-sm">
                    <strong>Title:</strong> {selected.title}
                  </div>
                  <div className="text-sm">
                    <strong>Position:</strong> ({selected.position.map(p => p.toFixed(1)).join(', ')})
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}