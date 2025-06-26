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
import type { Portfolio } from '@/types/portfolio';

export default function Editor() {
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  
  const {
    components,
    portfolioId,
    portfolioName,
    isSaving,
    setSaving,
    loadPortfolio,
    setPortfolioName,
    addComponent,
  } = useEditorStore();

  // Get portfolio ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const portfolioIdFromUrl = urlParams.get('id');

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
      loadPortfolio(
        portfolio.layout.components || [],
        portfolio.name,
        portfolio.id
      );
    }
  }, [portfolio, loadPortfolio]);

  // Auto-save functionality
  const saveMutation = useMutation({
    mutationFn: async () => {
      const portfolioData = {
        name: portfolioName,
        layout: { components },
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

  // Auto-save when components or name changes
  useEffect(() => {
    if (components.length > 0 || portfolioName !== 'Untitled Portfolio') {
      const timeoutId = setTimeout(() => {
        setSaving(true);
        saveMutation.mutate();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [components, portfolioName]);

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

  const handlePreview = () => {
    // TODO: Implement preview functionality
    toast({
      title: "Preview",
      description: "Preview functionality coming soon!",
    });
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative z-50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-layer-group text-white text-sm"></i>
              </div>
              <h1 className="text-xl font-bold text-gray-900">PortfolioBuilder</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 ml-8">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/dashboard')}
              >
                Dashboard
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <i className={`fas ${isSaving ? 'fa-spinner fa-spin' : 'fa-cloud-upload-alt'} ${isSaving ? 'text-blue-500' : 'text-green-500'}`}></i>
              <span>{isSaving ? 'Saving...' : 'All changes saved'}</span>
            </div>
            
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <i className="fas fa-eye mr-2"></i>
              Preview
            </Button>

            <Button onClick={() => setIsPublishModalOpen(true)}>
              <i className="fas fa-rocket mr-2"></i>
              Publish
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/api/logout'}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          <ComponentsSidebar />
          <CanvasEditor />
          <PropertiesPanel />
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
