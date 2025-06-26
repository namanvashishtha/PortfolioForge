import { Button } from '@/components/ui/button';

interface HeroComponentProps {
  id: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function HeroComponent({
  id,
  title = "Building Digital Experiences",
  subtitle = "I'm a passionate developer who loves creating beautiful, functional websites and applications that make a difference.",
  primaryButtonText = "View My Work",
  secondaryButtonText = "Download Resume",
  isSelected = false,
  isEditable = false,
  onClick,
}: HeroComponentProps) {
  return (
    <div
      className={`group relative border-2 transition-all rounded-lg p-4 -m-4 ${
        isSelected
          ? 'border-primary-300 bg-primary-50'
          : isEditable
          ? 'border-transparent hover:border-primary-200 hover:bg-primary-25'
          : 'border-transparent'
      } ${isEditable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {isEditable && (
        <div className={`absolute -top-8 left-0 transition-opacity z-10 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className="flex items-center space-x-2 bg-white shadow-lg rounded-lg px-3 py-1.5 border">
            <button className="text-gray-400 hover:text-primary-600 transition-colors">
              <i className="fas fa-edit text-sm"></i>
            </button>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <i className="fas fa-trash text-sm"></i>
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <i className="fas fa-copy text-sm"></i>
            </button>
          </div>
        </div>
      )}

      <div className="text-center py-16">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex items-center justify-center space-x-4">
          <Button className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium">
            {primaryButtonText}
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
