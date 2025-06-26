import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactComponentProps {
  id: string;
  title?: string;
  email?: string;
  phone?: string;
  showForm?: boolean;
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function ContactComponent({
  id,
  title = "Get In Touch",
  email = "contact@example.com",
  phone = "+1 (555) 123-4567",
  showForm = true,
  isSelected = false,
  isEditable = false,
  onClick,
}: ContactComponentProps) {
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

      <div className="py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-primary-500"></i>
                  <span className="text-gray-600">{email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-primary-500"></i>
                  <span className="text-gray-600">{phone}</span>
                </div>
              </div>
            </div>
            
            {showForm && (
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h4>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your Message" 
                      rows={4} 
                    />
                  </div>
                  <Button className="w-full bg-primary-500 hover:bg-primary-600">
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
