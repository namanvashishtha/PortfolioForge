import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import InteractiveHero from '@/components/InteractiveHero';



// Authentication form component
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        alert(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('An error occurred during authentication');
    }
  };

  return (
    <Card className="w-full max-w-md bg-black bg-opacity-80 border-gray-800 shadow-2xl backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-2xl flex items-center gap-2">
          <span>✦</span>
          {isLogin ? 'Access Portal' : 'Join the Galaxy'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {isLogin 
            ? 'Enter your cosmic credentials to access the universe' 
            : 'Begin your journey through the digital cosmos'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="your@email.com" 
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
              />
            </div>
            
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-200">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-200">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                  />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3 transition-all duration-300 shadow-lg">
              {isLogin ? '🚀 Launch' : '✦ Begin Journey'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 hover:text-white transition-colors duration-300"
        >
          {isLogin 
            ? "New to the galaxy? Join us ✦" 
            : "Already exploring? Access portal 🚀"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Starfield background */}
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
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">✦</span>
            </div>
            <h1 className="text-3xl font-bold text-white">PortfolioForge</h1>
            <span className="text-gray-400 text-sm font-mono">COSMIC</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Forge Your 
              <span className="bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent"> Cosmic Portfolio</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Journey through the Milky Way and create portfolios among the stars. 
              Experience the infinite possibilities of deep space portfolio creation.
            </p>
            
            <div className="flex items-center justify-center lg:justify-start space-x-6 mb-8 text-gray-400">
              <span className="text-3xl">✦</span>
              <span className="text-lg font-mono">SPIRAL ARMS</span>
              <span className="text-3xl">◦</span>
              <span className="text-lg font-mono">NEBULAE</span>
              <span className="text-3xl">✧</span>
              <span className="text-lg font-mono">BLACK HOLES</span>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <AuthForm />
          </div>
        </div>

        {/* Interactive 3D Hero - Now visible on all screen sizes */}
        <div className="w-full mb-16">
          <InteractiveHero />
        </div>
        
        {/* Cosmic Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-black bg-opacity-60 rounded-2xl shadow-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-2xl">🌌</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Galactic Editor</h3>
            <p className="text-gray-300">Navigate through spiral arms and nebulae while crafting your cosmic portfolio with stellar precision</p>
          </div>
          
          <div className="text-center p-8 bg-black bg-opacity-60 rounded-2xl shadow-2xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Warp Speed Deploy</h3>
            <p className="text-gray-300">Launch your portfolio across the digital universe at light speed with quantum deployment technology</p>
          </div>
          
          <div className="text-center p-8 bg-black bg-opacity-60 rounded-2xl shadow-2xl border border-gray-800 hover:border-pink-500 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white text-2xl">🌠</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Cosmic Responsive</h3>
            <p className="text-gray-300">Your portfolio adapts across all dimensions of space-time, from mobile devices to desktop galaxies</p>
          </div>
        </div>
      </div>
    </div>
  );
}
