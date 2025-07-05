import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { Portfolio } from '@/types/portfolio';
import ThreeScene from '@/components/ThreeScene';

export default function Dashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { toast } = useToast();
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);

  const { data: portfolios, isLoading, error } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolios'],
    enabled: !!user,
  });

  // Handle unauthorized errors
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-6" 
               style={{
                 boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
               }}></div>
          <p className="text-gray-300 text-lg">Navigating through the cosmos...</p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-gray-500">
            <span className="animate-pulse">✦</span>
            <span className="animate-pulse delay-100">◦</span>
            <span className="animate-pulse delay-200">✧</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
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
      <header className="bg-black bg-opacity-80 border-b border-gray-800 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">✦</span>
            </div>
            <h1 className="text-2xl font-bold text-white">PortfolioForge</h1>
            <span className="text-gray-400 text-sm font-mono">COSMIC</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span>🚀</span>
              Welcome, {user?.firstName || user?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={logout}
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Exit Galaxy
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <span>🌌</span>
              Your Cosmic Portfolios
            </h2>
            <p className="text-gray-300 mt-1">Navigate and manage your portfolio constellation</p>
            <div className="flex items-center space-x-4 mt-3 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <span>✦</span>
                <span>Active Portfolios</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>🚀</span>
                <span>Ready to Launch</span>
              </span>
            </div>
          </div>
          <Link href="/editor">
            <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
              <span>✦</span>
              <span>Create New Galaxy</span>
            </Button>
          </Link>
        </div>

        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Interactive Portfolio Viewer */}
            <div className="bg-black bg-opacity-60 p-6 rounded-xl shadow-2xl border border-gray-800 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span>🌠</span>
                Cosmic Portfolio Navigator
              </h3>
              <div className="bg-black bg-opacity-40 rounded-lg p-4 border border-gray-700">
                <ThreeScene 
                  onSelectItem={(id) => {
                    const portfolio = portfolios.find(p => p.id === id);
                    if (portfolio) {
                      setSelectedPortfolioId(portfolio.id);
                      toast({
                        title: "🌟 Portfolio Selected",
                        description: `You selected: ${portfolio.name}`,
                      });
                    }
                  }} 
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-400 mb-3 flex items-center justify-center gap-2">
                  <span>🖱️</span>
                  Navigate through your portfolio constellation
                </p>
                {selectedPortfolioId && (
                  <Link href={`/editor?id=${selectedPortfolioId}`}>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <span className="mr-2">🚀</span>
                      Launch Editor
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Portfolios List */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span>📋</span>
                Portfolio Constellation
              </h3>
              <div className="space-y-4">
                {portfolios.map((portfolio) => (
                  <Card 
                    key={portfolio.id} 
                    className={`bg-black bg-opacity-60 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-xl backdrop-blur-sm cursor-pointer ${
                      selectedPortfolioId === portfolio.id ? 'ring-2 ring-blue-400 border-blue-400' : ''
                    }`}
                    onClick={() => setSelectedPortfolioId(portfolio.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white">
                        <span className="flex items-center gap-2">
                          <span>✦</span>
                          {portfolio.name}
                        </span>
                        {portfolio.isPublished && (
                          <span className="px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 text-xs rounded-full border border-green-500 flex items-center gap-1">
                            <span>🚀</span>
                            Live in Space
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                        <span>🕒</span>
                        Last orbit: {new Date(portfolio.updatedAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex space-x-2">
                        <Link href={`/editor?id=${portfolio.id}`}>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-blue-600 hover:text-white hover:border-blue-500">
                            <span className="mr-2">🛠️</span>
                            Modify
                          </Button>
                        </Link>
                        
                        {portfolio.publishedUrl && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(portfolio.publishedUrl, '_blank');
                            }}
                            className="flex-1 border-gray-600 text-gray-300 hover:bg-purple-600 hover:text-white hover:border-purple-500"
                          >
                            <span className="mr-2">🌐</span>
                            Explore
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Card className="text-center py-16 bg-black bg-opacity-60 border-gray-800 backdrop-blur-sm">
            <CardContent>
              <div className="text-6xl mb-6">🌌</div>
              <h3 className="text-2xl font-semibold text-white mb-3">Your Galaxy Awaits</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The cosmic void is ready for your first portfolio creation. 
                Begin your journey through the digital universe.
              </p>
              <div className="flex items-center justify-center space-x-2 mb-6 text-gray-500">
                <span className="animate-pulse">✦</span>
                <span className="animate-pulse delay-100">◦</span>
                <span className="animate-pulse delay-200">✧</span>
              </div>
              <Link href="/editor">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3">
                  <span className="mr-2">✦</span>
                  Create Your First Galaxy
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
