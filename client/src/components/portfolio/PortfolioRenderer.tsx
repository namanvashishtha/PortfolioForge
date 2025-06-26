import { ComponentData } from '@/store/editorStore';
import HeaderComponent from './components/HeaderComponent';
import HeroComponent from './components/HeroComponent';
import AboutComponent from './components/AboutComponent';
import ProjectsComponent from './components/ProjectsComponent';
import SkillsComponent from './components/SkillsComponent';
import ContactComponent from './components/ContactComponent';

interface PortfolioRendererProps {
  components: ComponentData[];
  selectedComponentId?: string | null;
  onComponentClick?: (componentId: string) => void;
  isEditable?: boolean;
}

export default function PortfolioRenderer({ 
  components, 
  selectedComponentId, 
  onComponentClick,
  isEditable = false 
}: PortfolioRendererProps) {
  
  const renderComponent = (component: ComponentData) => {
    const isSelected = selectedComponentId === component.id;
    const commonProps = {
      key: component.id,
      id: component.id,
      isSelected,
      isEditable,
      onClick: () => onComponentClick?.(component.id),
      ...component.props,
    };

    switch (component.type) {
      case 'header':
        return <HeaderComponent {...commonProps} />;
      case 'hero':
        return <HeroComponent {...commonProps} />;
      case 'about':
        return <AboutComponent {...commonProps} />;
      case 'projects':
        return <ProjectsComponent {...commonProps} />;
      case 'skills':
        return <SkillsComponent {...commonProps} />;
      case 'contact':
        return <ContactComponent {...commonProps} />;
      default:
        return (
          <div key={component.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
            <p className="text-red-600">Unknown component type: {component.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {components.map(renderComponent)}
    </div>
  );
}
