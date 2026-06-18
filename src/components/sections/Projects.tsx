import { useRef } from 'react';
import { Globe, ExternalLink, ArrowRight } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: 'Scholarly',
    category: 'Educational Platform',
    description: 'A full-stack e-learning platform featuring course management, teacher & student dashboards, quizzes, downloadable resources, Google OAuth, and real-time chat — built for modern education.',
    results: 'Complete LMS with admin, teacher & student roles, quiz engine, and resource management.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'Express'],
    liveUrl: 'https://scholarlybackend.vercel.app/',
    githubUrl: '#'
  }
];

const ProjectCard = ({ project }: { project: typeof projectsData[0] }) => {
  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-[70vh] flex-shrink-0 relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/20 to-neonPurple/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="w-full h-full glass-card rounded-3xl overflow-hidden border border-white/10 relative z-10 flex flex-col">
        {/* Image Section */}
        <div className="h-1/2 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-4 py-1 rounded-full glass text-xs font-semibold uppercase tracking-wider text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="h-1/2 p-6 md:p-8 flex flex-col justify-between bg-black/60 backdrop-blur-xl">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
            <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs text-neonBlue bg-neonBlue/10 px-2 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-start gap-2 text-sm text-green-400/90 font-medium">
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{project.results}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
            <a href={project.liveUrl} className="flex items-center gap-2 text-white hover:text-neonBlue transition-colors group/link hover-target">
              <span className="font-semibold">Live Demo</span>
              <ExternalLink className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
            <a href={project.githubUrl} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover-target">
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" ref={targetRef} className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">Premium digital experiences crafted with modern technologies.</p>
        </div>

        <div className="flex justify-center">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
