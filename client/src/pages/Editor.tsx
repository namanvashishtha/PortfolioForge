import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { apiRequest } from '@/lib/queryClient';
import { useEditorStore } from '@/store/editorStore';
import ComponentsSidebar from '@/components/editor/ComponentsSidebar';
import CanvasEditor from '@/components/editor/CanvasEditor';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import PublishModal from '@/components/modals/PublishModal';
import PortfolioEditor3D from '@/components/PortfolioEditor3D';
import type { Portfolio } from '@/types/portfolio';

export default function Editor() {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  
  const {
    components,
    selectedComponentId,
    isPreviewMode,
    portfolioId,
    portfolioName,
    isSaving,
    addComponent,
    selectComponent,
    setPreviewMode,
    setPortfolioId,
    setPortfolioName,
    setSaving,
    loadPortfolio,
    clearEditor,
  } = useEditorStore();

  // Get portfolio ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const portfolioIdFromUrl = urlParams.get('id');
  
  // Properties panel state
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);

  // Load existing portfolio if ID is provided
  const { data: portfolio, isLoading, error } = useQuery<Portfolio>({
    queryKey: ['/api/portfolios', portfolioIdFromUrl],
    enabled: !!portfolioIdFromUrl && !!user,
  });

  // Handle unauthorized errors
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [user, authLoading, toast]);

  useEffect(() => {
    if (error && isUnauthorizedError(error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [error, toast]);

  // Load portfolio data when available
  useEffect(() => {
    if (portfolio) {
      const components = portfolio.layout?.components || [];
      loadPortfolio(
        components,
        portfolio.name,
        portfolio.id
      );
    }
  }, [portfolio, loadPortfolio]);

  // Auto-save functionality
  const saveMutation = useMutation({
    mutationFn: async () => {
      const portfolioData = {
        name: portfolioName || 'Untitled Portfolio',
        layout: { 
          components: components || [],
          theme: {}
        },
      };

      if (portfolioId) {
        return await apiRequest('PUT', `/api/portfolios/${portfolioId}`, portfolioData);
      } else {
        return await apiRequest('POST', '/api/portfolios', portfolioData);
      }
    },
    onSuccess: async (response) => {
      const data = await response.json();
      if (!portfolioId) {
        // Update URL with new portfolio ID
        const newUrl = `/editor?id=${data.id}`;
        window.history.replaceState({}, '', newUrl);
        loadPortfolio(components, portfolioName, data.id);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/portfolios'] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Manual save function
  const handleSave = () => {
    if (!saveMutation.isPending && !isSaving) {
      setSaving(true);
      saveMutation.mutate();
    }
  };

  // Preview mode toggle
  const handlePreview = () => {
    setPreviewMode(!isPreviewMode);
  };

  useEffect(() => {
    if (!saveMutation.isPending) {
      setSaving(false);
    }
  }, [saveMutation.isPending, setSaving]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id === 'canvas') {
      const componentDefinition = active.data.current;
      if (componentDefinition) {
        const newComponent = {
          id: `${componentDefinition.type}-${Date.now()}`,
          type: componentDefinition.type,
          props: { ...componentDefinition.defaultProps },
        };
        addComponent(newComponent);
      }
    }
  };



  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Cosmic loading background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
                             radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                             radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
                             radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                             radial-gradient(2px 2px at 160px 30px, #ffffff, transparent)`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 100px'
          }} />
        </div>
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-6" 
               style={{
                 boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)'
               }}></div>
          <p className="text-gray-300 text-xl mb-4">Initializing Cosmic Editor...</p>
          <div className="flex items-center justify-center space-x-3 text-gray-500">
            <span className="animate-pulse text-2xl">🛠️</span>
            <span className="animate-pulse delay-100 text-2xl">✦</span>
            <span className="animate-pulse delay-200 text-2xl">🌌</span>
          </div>
          <p className="text-gray-500 text-sm mt-4">Preparing your galactic workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col overflow-hidden bg-black relative">
        {/* Cosmic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
                             radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                             radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
                             radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                             radial-gradient(2px 2px at 160px 30px, #ffffff, transparent)`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 100px'
          }} />
        </div>
        
        {/* Header */}
        <header className="bg-black bg-opacity-90 border-b border-gray-800 px-6 py-4 flex items-center justify-between relative z-50 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">✦</span>
              </div>
              <h1 className="text-2xl font-bold text-white">PortfolioForge</h1>
              <span className="text-gray-400 text-sm font-mono">COSMIC EDITOR</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 ml-8">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/dashboard')}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <span className="mr-2">🌌</span>
                Galaxy Hub
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className={`${isSaving ? 'animate-pulse text-blue-400' : 'text-green-400'}`}>
                {isSaving ? '💫' : '✨'}
              </span>
              <span>{isSaving ? 'Syncing to cosmos...' : 'Synchronized'}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave} 
              disabled={saveMutation.isPending}
              className="border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-500"
            >
              <span className="mr-2">💾</span>
              {saveMutation.isPending ? 'Syncing...' : 'Save'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreview}
              className="border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500"
            >
              <span className="mr-2">{isPreviewMode ? '🛠️' : '👁️'}</span>
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>

            <Button 
              variant={is3DMode ? "default" : "outline"} 
              size="sm" 
              onClick={() => setIs3DMode(!is3DMode)}
              className={is3DMode ? 
                "bg-gradient-to-r from-blue-500 to-purple-600" : 
                "border-gray-600 text-gray-300 hover:bg-cyan-600 hover:text-white hover:border-cyan-500"
              }
            >
              <span className="mr-2">🌌</span>
              {is3DMode ? 'Flat View' : 'Cosmic View'}
            </Button>

            {!isPreviewMode && (
              <Button 
                variant={isPropertiesPanelOpen ? "default" : "outline"} 
                size="sm" 
                onClick={() => setIsPropertiesPanelOpen(!isPropertiesPanelOpen)}
                className={isPropertiesPanelOpen ? 
                  "bg-gradient-to-r from-purple-500 to-pink-600" : 
                  "border-gray-600 text-gray-300 hover:bg-pink-600 hover:text-white hover:border-pink-500"
                }
              >
                <span className="mr-2">⚙️</span>
                Controls
              </Button>
            )}

            <Button 
              onClick={() => setIsPublishModalOpen(true)}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <span className="mr-2">🚀</span>
              Launch to Space
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="border-gray-600 text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-500"
            >
              Exit Galaxy
            </Button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden relative z-10">
          {is3DMode ? (
            <div className="w-full bg-black bg-opacity-40 backdrop-blur-sm">
              <PortfolioEditor3D 
                onComponentSelect={(componentId) => selectComponent(componentId)}
                onComponentUpdate={(componentId, updates) => {
                  // Handle component updates in 3D mode
                  console.log('Component updated:', componentId, updates);
                }}
              />
            </div>
          ) : (
            <>
              {!isPreviewMode && <ComponentsSidebar />}
              <CanvasEditor />
              {!isPreviewMode && isPropertiesPanelOpen && <PropertiesPanel />}
            </>
          )}
        </div>

        <PublishModal
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          portfolioId={portfolioId}
          portfolioName={portfolioName}
        />
      </div>
    </DndContext>
  );
}
