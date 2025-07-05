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
    <div className="flex-1 flex flex-col bg-black bg-opacity-40 overflow-hidden backdrop-blur-sm">
      {/* Cosmic Canvas Toolbar */}
      {!isPreviewMode && (
        <div className="bg-black bg-opacity-80 border-b border-gray-800 px-6 py-3 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <span>🔍</span>
                Zoom:
              </span>
              <select className="text-sm border border-gray-600 bg-black bg-opacity-60 text-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>100%</option>
                <option>75%</option>
                <option>50%</option>
                <option>Fit Galaxy</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition-colors" title="Undo">
                <span>↶</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-gray-700 transition-colors" title="Redo">
                <span>↷</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors">
              <span>📱</span>
              <span className="hidden sm:inline">Mobile</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium bg-blue-500 bg-opacity-20 text-blue-300 rounded-md border border-blue-500">
              <span>🖥️</span>
              <span className="hidden sm:inline">Desktop</span>
            </button>
          </div>
        </div>
      )}

      {/* Cosmic Canvas Container */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={setNodeRef}
            className={`bg-black bg-opacity-60 rounded-lg shadow-2xl border-2 backdrop-blur-sm ${
              isOver ? 'border-blue-400 bg-blue-500 bg-opacity-10' : 'border-dashed border-gray-700'
            } min-h-screen p-8 relative transition-all`}
            style={{
              boxShadow: isOver ? '0 0 30px rgba(59, 130, 246, 0.3)' : '0 0 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            {components.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-70">
                <div className="text-center">
                  <div className="text-6xl mb-6">🌌</div>
                  <p className="text-gray-300 text-xl font-medium mb-2">Begin Your Cosmic Creation</p>
                  <p className="text-gray-500 text-sm mb-4">Drag galactic components here to forge your portfolio</p>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <span className="animate-pulse">✦</span>
                    <span className="animate-pulse delay-100">◦</span>
                    <span className="animate-pulse delay-200">✧</span>
                  </div>
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
