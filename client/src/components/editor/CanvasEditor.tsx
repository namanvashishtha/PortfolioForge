import { useDroppable } from '@dnd-kit/core';
import { useEditorStore } from '@/store/editorStore';
import { ComponentData } from '@/store/editorStore';
import PortfolioRenderer from '../portfolio/PortfolioRenderer';
import { nanoid } from 'nanoid';

export default function CanvasEditor() {
  const { 
    components, 
    selectedComponentId, 
    addComponent, 
    selectComponent,
    isPreviewMode 
  } = useEditorStore();

  const { isOver, setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const handleDrop = (event: any) => {
    const { active } = event;
    const componentDefinition = active.data.current;
    
    if (componentDefinition) {
      const newComponent: ComponentData = {
        id: nanoid(),
        type: componentDefinition.type,
        props: { ...componentDefinition.defaultProps },
      };
      
      addComponent(newComponent);
    }
  };

  const handleComponentClick = (componentId: string) => {
    if (!isPreviewMode) {
      selectComponent(selectedComponentId === componentId ? null : componentId);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Canvas Toolbar */}
      {!isPreviewMode && (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Zoom:</span>
              <select className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>100%</option>
                <option>75%</option>
                <option>50%</option>
                <option>Fit</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors" title="Undo">
                <i className="fas fa-undo text-sm"></i>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors" title="Redo">
                <i className="fas fa-redo text-sm"></i>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
              <i className="fas fa-mobile-alt"></i>
              <span className="hidden sm:inline">Mobile</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium bg-primary-50 text-primary-600 rounded-md">
              <i className="fas fa-desktop"></i>
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>
        </div>
      )}

      {/* Canvas Container */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={setNodeRef}
            className={`bg-white rounded-lg shadow-sm border-2 ${
              isOver ? 'border-primary-300 bg-primary-50' : 'border-dashed border-gray-200'
            } min-h-screen p-8 relative transition-all`}
          >
            {components.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                <div className="text-center">
                  <i className="fas fa-plus-circle text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-400 text-lg font-medium">Drag components here to start building</p>
                  <p className="text-gray-300 text-sm mt-2">Or choose from our templates to get started quickly</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <PortfolioRenderer 
                  components={components}
                  selectedComponentId={selectedComponentId}
                  onComponentClick={handleComponentClick}
                  isEditable={!isPreviewMode}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
