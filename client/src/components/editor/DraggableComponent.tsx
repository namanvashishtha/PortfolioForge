import { useDraggable } from '@dnd-kit/core';
import { ComponentDefinition } from '@/types/portfolio';

interface DraggableComponentProps {
  definition: ComponentDefinition;
}

export default function DraggableComponent({ definition }: DraggableComponentProps) {
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
