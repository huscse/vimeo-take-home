import { VideoCarousel } from './components/VideoCarousal';

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

interface Project {
  title: string;
  image: string;
  description: string;
  imageRight: boolean;
  darkBg: boolean;
}

const ProjectSection = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <div
      className={`w-full ${index === 0 ? 'py-24 md:py-32' : 'py-12 md:py-16'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col-reverse md:flex-row items-center justify-between
          ${index === 0 ? 'gap-16' : 'gap-12'}`}
        >
          {!project.imageRight && (
            <div
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

          <div
            className={`w-full md:w-1/2 space-y-6 ${
              index === 0 ? 'px-0 md:px-8' : 'px-0'
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold 
              ${index === 0 ? 'tracking-widest' : 'tracking-tight'}
              ${project.darkBg ? 'text-white' : 'text-white-900'}`}
            >
              {project.title}
            </h2>
            <p
              className={`text-base md:text-md font-bold leading-relaxed
              ${project.darkBg ? 'text-white' : 'text-white-600'}`}
            >
              {project.description}
            </p>
          </div>

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

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <ProjectSection project={projects[0]} index={0} />
      </div>
      <div
        style={{
          background:
            'linear-gradient(180deg, #1C1C1C 0%, #3A3A3A 14%, #5B5B5B 28%, #7E7E7E 42%, #A4A4A4 57%, #CBCBCB 71%, #F1F1F1 85%)',
        }}
      >
        <ProjectSection project={projects[1]} index={1} />
        <ProjectSection project={projects[2]} index={2} />
      </div>
      <section>
        <VideoCarousel />
      </section>
    </div>
  );
};

export default App;
