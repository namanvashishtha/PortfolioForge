interface HeaderComponentProps {
  id: string;
  name?: string;
  title?: string;
  navItems?: string[];
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function HeaderComponent({
  id,
  name = "John Doe",
  title = "Full Stack Developer",
  navItems = ["About", "Projects", "Skills", "Contact"],
  isSelected = false,
  isEditable = false,
  onClick,
}: HeaderComponentProps) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
        <div className={`absolute -top-8 left-0 transition-opacity ${
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

      <header className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">{getInitials(name)}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={`#${item.toLowerCase()}`} 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>
    </div>
  );
}
