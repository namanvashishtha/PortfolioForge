interface AboutComponentProps {
  id: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function AboutComponent({
  id,
  title = "About Me",
  content = "I am a passionate developer with experience in modern web technologies.",
  imageUrl = "",
  isSelected = false,
  isEditable = false,
  onClick,
}: AboutComponentProps) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{content}</p>
            </div>
            <div className="flex justify-center">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="About" 
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <i className="fas fa-user text-4xl text-gray-400"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
