interface SkillsComponentProps {
  id: string;
  title?: string;
  skills?: string[];
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function SkillsComponent({
  id,
  title = "Skills",
  skills = ["JavaScript", "React", "Node.js", "Python", "SQL"],
  isSelected = false,
  isEditable = false,
  onClick,
}: SkillsComponentProps) {
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
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
