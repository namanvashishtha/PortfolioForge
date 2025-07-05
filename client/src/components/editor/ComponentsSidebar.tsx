import { ComponentDefinition } from '@/types/portfolio';
import { useDraggable } from '@dnd-kit/core';

// Cosmic icon mapping
const getCosmicIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    header: '🌟',
    hero: '🌌',
    about: '👨‍🚀',
    projects: '🛸',
    skills: '⚡',
    contact: '📡',
    footer: '🌠',
    text: '📝',
    image: '🖼️',
    button: '🔘',
    card: '🎴',
    list: '📋',
    divider: '➖',
  };
  return iconMap[type] || '✦';
};

const componentDefinitions: ComponentDefinition[] = [
  {
    type: 'header',
    name: 'Header',
    icon: 'fas fa-heading',
    category: 'layout',
    description: 'Navigation header with logo and menu',
    defaultProps: {
      name: 'John Doe',
      title: 'Full Stack Developer',
      navItems: ['About', 'Projects', 'Skills', 'Contact'],
    }
  },
  {
    type: 'hero',
    name: 'Hero Section',
    icon: 'fas fa-star',
    category: 'layout',
    description: 'Main hero section with title and CTA',
    defaultProps: {
      title: 'Building Digital Experiences',
      subtitle: 'I\'m a passionate developer who loves creating beautiful, functional websites and applications that make a difference.',
      primaryButtonText: 'View My Work',
      secondaryButtonText: 'Download Resume',
    }
  },
  {
    type: 'about',
    name: 'About Me',
    icon: 'fas fa-user',
    category: 'layout',
    description: 'About section with bio and photo',
    defaultProps: {
      title: 'About Me',
      content: 'I am a passionate developer with experience in modern web technologies.',
      imageUrl: '',
    }
  },
  {
    type: 'projects',
    name: 'Projects',
    icon: 'fas fa-code',
    category: 'layout',
    description: 'Showcase of your projects',
    defaultProps: {
      title: 'Featured Projects',
      subtitle: 'Here are some of the projects I\'ve worked on recently',
      projects: [
        {
          title: 'Analytics Dashboard',
          description: 'A comprehensive dashboard for data visualization',
          technologies: ['React', 'Node.js'],
          imageUrl: '',
          link: '#'
        }
      ]
    }
  },
  {
    type: 'skills',
    name: 'Skills',
    icon: 'fas fa-cogs',
    category: 'layout',
    description: 'Display your technical skills',
    defaultProps: {
      title: 'Skills',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL']
    }
  },
  {
    type: 'contact',
    name: 'Contact',
    icon: 'fas fa-envelope',
    category: 'layout',
    description: 'Contact form and information',
    defaultProps: {
      title: 'Get In Touch',
      email: 'contact@example.com',
      phone: '+1 (555) 123-4567',
      showForm: true,
    }
  }
];

interface DraggableComponentProps {
  definition: ComponentDefinition;
}

function DraggableComponent({ definition }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: definition.type,
    data: definition,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`group cursor-move p-3 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-400 hover:bg-blue-500 hover:bg-opacity-10 transition-all backdrop-blur-sm ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 group-hover:text-blue-400 text-lg">
          {getCosmicIcon(definition.type)}
        </span>
        <div>
          <span className="text-sm font-medium text-gray-300 group-hover:text-white block">
            {definition.name}
          </span>
          <span className="text-xs text-gray-500 group-hover:text-gray-300">
            {definition.description}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ComponentsSidebar() {
  const layoutComponents = componentDefinitions.filter(comp => comp.category === 'layout');
  const contentComponents = componentDefinitions.filter(comp => comp.category === 'content');

  return (
    <div className="w-80 bg-black bg-opacity-80 border-r border-gray-800 flex flex-col overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span>🧩</span>
            Cosmic Components
          </h2>
          <button className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors">
            <span>🔍</span>
          </button>
        </div>
        
        <div className="flex space-x-1">
          <button className="px-3 py-1.5 bg-blue-500 bg-opacity-20 text-blue-300 text-sm font-medium rounded-md border border-blue-500">
            All
          </button>
          <button className="px-3 py-1.5 text-gray-400 hover:text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
            Layout
          </button>
          <button className="px-3 py-1.5 text-gray-400 hover:text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
            Content
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
            <span>🏗️</span>
            Galactic Structures
          </h3>
          <div className="space-y-3">
            {layoutComponents.map((definition) => (
              <DraggableComponent key={definition.type} definition={definition} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
            <span>🎨</span>
            Cosmic Templates
          </h3>
          <div className="space-y-3">
            <div className="group cursor-pointer p-3 border border-gray-700 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded mb-2 flex items-center justify-center opacity-80">
                <span className="text-white text-2xl">👨‍💻</span>
              </div>
              <span className="text-sm font-medium text-gray-300">Space Developer</span>
              <p className="text-xs text-gray-500 mt-1">Cosmic design for stellar developers</p>
            </div>

            <div className="group cursor-pointer p-3 border border-gray-700 rounded-lg hover:border-purple-400 hover:shadow-lg transition-all bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="w-full h-20 bg-gradient-to-r from-pink-500 to-orange-500 rounded mb-2 flex items-center justify-center opacity-80">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <span className="text-sm font-medium text-gray-300">Nebula Designer</span>
              <p className="text-xs text-gray-500 mt-1">Artistic layout for cosmic creatives</p>
            </div>

            <div className="group cursor-pointer p-3 border border-gray-700 rounded-lg hover:border-green-400 hover:shadow-lg transition-all bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="w-full h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded mb-2 flex items-center justify-center opacity-80">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <span className="text-sm font-medium text-gray-300">Starship Engineer</span>
              <p className="text-xs text-gray-500 mt-1">Technical layout for space engineers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
