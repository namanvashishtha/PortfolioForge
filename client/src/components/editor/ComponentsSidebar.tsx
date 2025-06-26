import { ComponentDefinition } from '@/types/portfolio';
import { useDraggable } from '@dnd-kit/core';

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
      className={`group cursor-move p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <i className={`${definition.icon} text-gray-400 group-hover:text-primary-500`}></i>
        <div>
          <span className="text-sm font-medium text-gray-600 group-hover:text-primary-600 block">
            {definition.name}
          </span>
          <span className="text-xs text-gray-500 group-hover:text-primary-500">
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
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Components</h2>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
            <i className="fas fa-search text-sm"></i>
          </button>
        </div>
        
        <div className="flex space-x-1">
          <button className="px-3 py-1.5 bg-primary-50 text-primary-600 text-sm font-medium rounded-md">
            All
          </button>
          <button className="px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
            Layout
          </button>
          <button className="px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
            Content
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Layout</h3>
          <div className="space-y-3">
            {layoutComponents.map((definition) => (
              <DraggableComponent key={definition.type} definition={definition} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Templates</h3>
          <div className="space-y-3">
            <div className="group cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <div className="w-full h-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded mb-2 flex items-center justify-center">
                <i className="fas fa-code text-blue-400"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Developer</span>
              <p className="text-xs text-gray-500 mt-1">Clean, minimal design for developers</p>
            </div>

            <div className="group cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
              <div className="w-full h-20 bg-gradient-to-r from-pink-50 to-orange-50 rounded mb-2 flex items-center justify-center">
                <i className="fas fa-palette text-pink-400"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Designer</span>
              <p className="text-xs text-gray-500 mt-1">Creative layout for design portfolios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
