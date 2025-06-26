import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: number | null;
  portfolioName: string;
}

export default function PublishModal({ isOpen, onClose, portfolioId, portfolioName }: PublishModalProps) {
  const [siteName, setSiteName] = useState(
    (portfolioName || 'untitled-portfolio').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  );
  const { toast } = useToast();

  // Update siteName when portfolioName changes
  useEffect(() => {
    if (portfolioName) {
      setSiteName(portfolioName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  }, [portfolioName]);
  const queryClient = useQueryClient();

  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!portfolioId) throw new Error('No portfolio selected');
      
      return await apiRequest('POST', `/api/portfolios/${portfolioId}/publish`, {
        siteName,
      });
    },
    onSuccess: async (response) => {
      const data = await response.json();
      toast({
        title: "Portfolio Published!",
        description: `Your portfolio is now live at ${data.publishedUrl}`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/portfolios'] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Publishing Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePublish = () => {
    if (!siteName.trim()) {
      toast({
        title: "Site name required",
        description: "Please enter a site name for your portfolio",
        variant: "destructive",
      });
      return;
    }
    publishMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Portfolio</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="my-portfolio"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your site will be available at {siteName}.vercel.app
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <i className="fas fa-rocket text-primary-600 text-sm"></i>
              </div>
              <div>
                <p className="font-medium text-gray-900">Ready to publish</p>
                <p className="text-sm text-gray-500">Your portfolio will be live in seconds</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handlePublish} 
            disabled={publishMutation.isPending}
            className="flex-1"
          >
            {publishMutation.isPending ? 'Publishing...' : 'Publish Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
