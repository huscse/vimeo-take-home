import { VideoCarousel } from './components/VideoCarousal';

/**
 * Static project data array containing information about each project
 * to be displayed in the project sections
 */
const projects = [
  {
    title: 'MONSOON III',
    image:
      'https://i.vimeocdn.com/custom_asset/6901fb9c170ed1ca1403e2130e687da4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.',
    imageRight: false,
    darkBg: false,
  },
  {
    title: 'BEAMS',
    image:
      'https://i.vimeocdn.com/custom_asset/a249c042da3d2a38df82e5c274aee876',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.',
    imageRight: true,
    darkBg: true,
  },
  {
    title: 'Move 2',
    image:
      'https://i.vimeocdn.com/custom_asset/94078a0190b78a2b7e767c5d89ca888e',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt ipsum augue. In faucibus vehicula magna pulvinar aliquam. Cras aliquam feugiat lorem non auctor. Quisque sed lorem egestas mauris venenatis commodo eu id nibh. Ut porta libero sed semper faucibus.',
    imageRight: false,
    darkBg: true,
  },
];

/**
 * TypeScript interface defining the structure of a project object
 */
interface Project {
  title: string; // Project title
  image: string; // URL of the project image
  description: string; // Project description text
  imageRight: boolean; // Flag to determine image position
  darkBg: boolean; // Flag for dark background styling
}

/**
 * ProjectSection Component
 * Renders a single project section with responsive layout and conditional styling
 *
 * @param {Project} project - The project data to display
 * @param {number} index - The index of the project in the list (affects styling)
 */
const ProjectSection = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <div
      // Apply different padding based on whether it's the first project
      className={`w-full ${index === 0 ? 'py-24 md:py-32' : 'py-12 md:py-16'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          // Layout structure with conditional gap spacing
          className={`flex flex-col-reverse md:flex-row items-center justify-between
          ${index === 0 ? 'gap-16' : 'gap-12'}`}
        >
          {/* Conditionally render image on the left side */}
          {!project.imageRight && (
            <div
              // Apply different height based on index
              className={`w-full md:w-1/2 ${
                index === 0 ? 'h-36 md:h-48' : 'h-48 md:h-72'
              } overflow-hidden mt-6 md:mt-0`}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Project content section */}
          <div
            className={`w-full md:w-1/2 space-y-6 ${
              index === 0 ? 'px-0 md:px-8' : 'px-0'
            }`}
          >
            <h2
              // Title styling with conditional formatting
              className={`text-3xl md:text-4xl font-bold 
              ${index === 0 ? 'tracking-widest' : 'tracking-tight'}
              ${project.darkBg ? 'text-white' : 'text-white-900'}`}
            >
              {project.title}
            </h2>
            <p
              // Description text styling
              className={`text-base md:text-md font-bold leading-relaxed
              ${project.darkBg ? 'text-white' : 'text-white-600'}`}
            >
              {project.description}
            </p>
          </div>

          {/* Conditionally render image on the right side */}
          {project.imageRight && (
            <div className="w-full md:w-1/2 h-48 md:h-72 overflow-hidden mt-6 md:mt-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Main App Component
 * Renders the entire application structure including projects and video carousel
 */
const App = () => {
  return (
    <div className="min-h-screen">
      {/* White background section for the first project */}
      <div className="bg-white">
        <ProjectSection project={projects[0]} index={0} />
      </div>

      {/* Gradient background section for subsequent projects */}
      <div
        style={{
          background:
            'linear-gradient(180deg, #1C1C1C 0%, #3A3A3A 14%, #5B5B5B 28%, #7E7E7E 42%, #A4A4A4 57%,rgb(175, 169, 169) 71%,rgb(234, 232, 232) 85%)',
        }}
      >
        <ProjectSection project={projects[1]} index={1} />
        <ProjectSection project={projects[2]} index={2} />
      </div>

      {/* Video carousel section */}
      <section>
        <VideoCarousel />
      </section>
    </div>
  );
};

export default App;
