interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  link?: string;
}

interface ProjectsComponentProps {
  id: string;
  title?: string;
  subtitle?: string;
  projects?: Project[];
  isSelected?: boolean;
  isEditable?: boolean;
  onClick?: () => void;
}

export default function ProjectsComponent({
  id,
  title = "Featured Projects",
  subtitle = "Here are some of the projects I've worked on recently",
  projects = [
    {
      title: "Analytics Dashboard",
      description: "A comprehensive dashboard for data visualization",
      technologies: ["React", "Node.js"],
      imageUrl: "",
      link: "#"
    }
  ],
  isSelected = false,
  isEditable = false,
  onClick,
}: ProjectsComponentProps) {
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
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fas fa-code text-3xl text-gray-400"></i>
                )}
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
