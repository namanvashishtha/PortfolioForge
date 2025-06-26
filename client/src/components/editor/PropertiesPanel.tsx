import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function PropertiesPanel() {
  const { 
    components, 
    selectedComponentId, 
    updateComponent, 
    removeComponent, 
    selectComponent 
  } = useEditorStore();

  const selectedComponent = components.find(comp => comp.id === selectedComponentId);

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
          <p className="text-sm text-gray-500 mt-1">Select a component to edit its properties</p>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <i className="fas fa-mouse-pointer text-3xl text-gray-300 mb-4"></i>
            <p className="text-gray-400">No component selected</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (key: string, value: any) => {
    updateComponent(selectedComponent.id, { [key]: value });
  };

  const handleRemove = () => {
    removeComponent(selectedComponent.id);
    selectComponent(null);
  };

  const renderPropertyFields = () => {
    switch (selectedComponent.type) {
      case 'header':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input 
                  value={selectedComponent.props.name || ''} 
                  onChange={(e) => handlePropertyChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
            </div>
          </>
        );
      
      case 'hero':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea 
                  value={selectedComponent.props.subtitle || ''} 
                  onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label>Primary Button Text</Label>
                <Input 
                  value={selectedComponent.props.primaryButtonText || ''} 
                  onChange={(e) => handlePropertyChange('primaryButtonText', e.target.value)}
                />
              </div>
              <div>
                <Label>Secondary Button Text</Label>
                <Input 
                  value={selectedComponent.props.secondaryButtonText || ''} 
                  onChange={(e) => handlePropertyChange('secondaryButtonText', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      case 'about':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea 
                  value={selectedComponent.props.content || ''} 
                  onChange={(e) => handlePropertyChange('content', e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input 
                  value={selectedComponent.props.imageUrl || ''} 
                  onChange={(e) => handlePropertyChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </>
        );

      case 'projects':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea 
                  value={selectedComponent.props.subtitle || ''} 
                  onChange={(e) => handlePropertyChange('subtitle', e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </>
        );

      case 'skills':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Skills (comma-separated)</Label>
                <Textarea 
                  value={selectedComponent.props.skills?.join(', ') || ''} 
                  onChange={(e) => handlePropertyChange('skills', e.target.value.split(',').map((s: string) => s.trim()))}
                  rows={3}
                />
              </div>
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={selectedComponent.props.title || ''} 
                  onChange={(e) => handlePropertyChange('title', e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input 
                  value={selectedComponent.props.email || ''} 
                  onChange={(e) => handlePropertyChange('email', e.target.value)}
                  type="email"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input 
                  value={selectedComponent.props.phone || ''} 
                  onChange={(e) => handlePropertyChange('phone', e.target.value)}
                />
              </div>
            </div>
          </>
        );

      default:
        return <div className="text-sm text-gray-500">No properties available for this component</div>;
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        <p className="text-sm text-gray-500 mt-1">Edit component properties</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Component Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Component</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <i className="fas fa-layer-group text-primary-500"></i>
                <span className="font-medium text-gray-900 capitalize">{selectedComponent.type}</span>
              </div>
            </div>
          </div>

          {/* Content Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Content</h3>
            {renderPropertyFields()}
          </div>

          <Separator />

          {/* Actions */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Actions</h3>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleRemove}
              >
                <i className="fas fa-trash mr-2"></i>
                Delete Component
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
