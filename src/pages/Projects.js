import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX } from 'react-icons/fi';
import ecommerce from '../assets/ecomm.png';
import task from '../assets/task.png';
import realestate from '../assets/realestate.png';
import weather from '../assets/weather.png';
import analytics from '../assets/analytics.png';
import fitness from '../assets/fitness.png';

const ProjectsContainer = styled.div`
  padding: 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const PageDescription = styled.p`
  max-width: 800px;
  margin: 0 auto;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.lightBg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProjectInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 15px;
  flex: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const ProjectTag = styled.span`
  padding: 4px 10px;
  background-color: rgba(108, 92, 231, 0.1);
  color: ${props => props.theme.colors.primary};
  border-radius: 50px;
  font-size: 0.75rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  backdrop-filter: blur(2px);
  class-name: overlay;
`;

const OverlayButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const DetailModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: pointer;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.colors.lightBg};
  margin-top: 100px;
  margin-bottom: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  cursor: default;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 10px;
  }
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const DetailImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DetailDescription = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

const DetailSection = styled.div`
  margin-bottom: 30px;
`;

const DetailSectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.textSecondary};
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TechItem = styled.div`
  padding: 5px 15px;
  background-color: rgba(108, 92, 231, 0.1);
  color: ${props => props.theme.colors.primary};
  border-radius: 50px;
  font-size: 0.85rem;
`;

const DetailLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const DetailLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

// Dummy project data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout.",
    fullDescription: "This modern e-commerce platform offers businesses a complete solution for selling products online. With an intuitive user interface, powerful admin dashboard, and seamless checkout process, it provides an exceptional shopping experience for customers and easy management for store owners.",
    features: [
      "Responsive product catalog with filtering and search",
      "Secure payment processing with Stripe integration",
      "User account management with order history",
      "Admin dashboard for product and order management",
      "Real-time inventory tracking"
    ],
    technologies: ["React", "Python", "FastAPI", "MySQL", "Firebase", "Stripe"],
    category: "Full Stack",
    image: ecommerce,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "Python", "FastAPI", "MySQL"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A drag-and-drop task management application with team collaboration features.",
    fullDescription: "This task management application helps teams stay organized and productive. With features like drag-and-drop task organization, team member assignment, deadline tracking, and progress visualization, it streamlines workflow and enhances collaboration.",
    features: [
      "Drag-and-drop interface for task organization",
      "Team collaboration with real-time updates",
      "Task assignment and deadline tracking",
      "Progress visualization and reporting",
      "Notification system for task updates"
    ],
    technologies: ["React", "Firebase", "Chart.js", "Material UI"],
    category: "Frontend",
    image: task,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "Firebase", "Material UI"]
  },
  {
    id: 3,
    title: "Real Estate Marketplace",
    description: "A real estate platform with property listings, search filters, and interactive maps.",
    fullDescription: "This comprehensive real estate marketplace connects property buyers, sellers, and agents in one platform. It features detailed property listings with high-quality images, interactive maps for location-based searching, and powerful filtering to help users find their perfect property.",
    features: [
      "Advanced property search with multiple filters",
      "Interactive maps with property pins",
      "Virtual property tours and image galleries",
      "Agent contact and property inquiry system",
      "Saved favorites and property comparisons"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Google Maps API", "AWS S3"],
    category: "Full Stack",
    image: realestate,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "Node.js", "PostgreSQL"]
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "An interactive weather dashboard with real-time updates and forecast visualization.",
    fullDescription: "This weather dashboard provides users with accurate, real-time weather information in a visually appealing interface. It features current conditions, 7-day forecasts, and historical weather data visualization, all powered by a reliable weather API.",
    features: [
      "Real-time weather updates for any location",
      "Interactive visualization of forecast data",
      "Location-based weather detection",
      "Historical weather data and trends",
      "Severe weather alerts and notifications"
    ],
    technologies: ["React", "D3.js", "OpenWeather API", "Recharts", "Geolocation API"],
    category: "Frontend",
    image: weather,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "API Integration", "D3.js"]
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "A comprehensive analytics platform for social media performance tracking.",
    fullDescription: "This social media analytics platform helps businesses track their performance across multiple social channels. With intuitive dashboards, detailed reports, and actionable insights, it enables data-driven social media strategy optimization.",
    features: [
      "Multi-platform social media tracking",
      "Performance analytics and reporting",
      "Competitor analysis and benchmarking",
      "Audience insights and demographic data",
      "Content performance optimization"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "Social Media APIs"],
    category: "Full Stack",
    image: analytics,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "Node.js", "Chart.js"]
  },
  {
    id: 6,
    title: "Fitness Tracking Application",
    description: "A mobile-responsive fitness tracker with workout plans and progress visualization.",
    fullDescription: "This fitness tracking application helps users achieve their health and fitness goals. It offers workout planning, progress tracking, nutritional guidance, and personalized recommendations based on user performance and goals.",
    features: [
      "Customizable workout plans and routines",
      "Progress tracking with visual charts and metrics",
      "Nutritional tracking and meal planning",
      "Goal setting and achievement celebrations",
      "Community challenges and social sharing"
    ],
    technologies: ["React", "Firebase", "Chart.js", "Progressive Web App", "Health APIs"],
    category: "Frontend",
    image: fitness,
    siteUrl: "#",
    githubUrl: "#",
    tags: ["React", "Firebase", "PWA"]
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <ProjectsContainer>
      <PageHeader>
        <PageTitle>My <span>Projects</span></PageTitle>
        <PageDescription>
          Browse through a collection of projects demonstrating my skills in React development, from responsive web applications to full-stack solutions.
        </PageDescription>
      </PageHeader>
      
      <FilterContainer>
        <FilterButton 
          active={selectedCategory === 'All'} 
          onClick={() => setSelectedCategory('All')}
        >
          All Projects
        </FilterButton>
        <FilterButton 
          active={selectedCategory === 'Frontend'} 
          onClick={() => setSelectedCategory('Frontend')}
        >
          Frontend
        </FilterButton>
        <FilterButton 
          active={selectedCategory === 'Full Stack'} 
          onClick={() => setSelectedCategory('Full Stack')}
        >
          Full Stack
        </FilterButton>
      </FilterContainer>
      
      <ProjectsGrid
        layout
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectImageContainer>
                <ProjectImage src={project.image} alt={project.title} />
                <ProjectOverlay className="overlay">
                  <OverlayButton onClick={() => openProjectDetail(project)}>
                    View Details
                  </OverlayButton>
                </ProjectOverlay>
              </ProjectImageContainer>
              
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <ProjectTag key={index}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                
              </ProjectInfo>
            </ProjectCard>
          ))}
        </AnimatePresence>
      </ProjectsGrid>
      
      <AnimatePresence>
        {selectedProject && (
          <DetailModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeProjectDetail}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.25 }}
            >
              <DetailHeader>
                <DetailTitle>{selectedProject.title}</DetailTitle>
                <CloseButton onClick={closeProjectDetail}>
                  <FiX />
                </CloseButton>
              </DetailHeader>
              
              <DetailImage src={selectedProject.image} alt={selectedProject.title} />
              
              <DetailDescription>{selectedProject.fullDescription}</DetailDescription>
              
              <DetailSection>
                <DetailSectionTitle>Key Features</DetailSectionTitle>
                <FeatureList>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </FeatureList>
              </DetailSection>
              
              <DetailSection>
                <DetailSectionTitle>Technologies Used</DetailSectionTitle>
                <TechList>
                  {selectedProject.technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </DetailSection>
              
              <DetailLinks>
              </DetailLinks>
            </ModalContent>
          </DetailModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects; 