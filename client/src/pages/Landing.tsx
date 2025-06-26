import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-layer-group text-white text-xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">PortfolioBuilder</h1>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Perfect Portfolio in Minutes
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create stunning, professional portfolios with our intuitive drag-and-drop editor. 
            No coding required. Deploy instantly to the web.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-16">
            <Button 
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => window.location.href = '/api/login'}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg"
            >
              View Examples
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mouse-pointer text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop Editor</h3>
              <p className="text-gray-600">Build your portfolio visually with our intuitive drag-and-drop interface</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Deploy</h3>
              <p className="text-gray-600">Publish your portfolio to the web with a single click</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mobile-alt text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Responsive</h3>
              <p className="text-gray-600">Your portfolio looks perfect on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
