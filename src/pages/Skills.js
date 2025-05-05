import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiCode, FiDatabase, FiServer, FiLayers, FiTool, FiShield } from 'react-icons/fi';

const SkillsContainer = styled.div`
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

const SkillsCategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  gap: 15px;
`;

const CategoryIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SkillItem = styled.div``;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SkillName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const SkillPercentage = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 4px;
  width: ${props => props.progress}%;
`;

const SkillTagsContainer = styled.div`
  margin-top: 100px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const SkillTagsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const TagsCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

const SkillTag = styled(motion.div)`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: 50px;
  font-size: ${props => 0.9 + props.size * 0.3}rem;
  font-weight: ${props => 400 + props.size * 100};
  color: ${props => props.theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: default;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const ExperienceSection = styled.section`
  margin-top: 100px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const ExperienceTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background-color: ${props => props.theme.colors.primary};
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      left: 20px;
      transform: none;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  position: relative;
  margin-bottom: 50px;
  width: 50%;
  
  &:nth-child(even) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 30px;
    padding-right: 0;
    margin-left: auto;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    background-color: ${props => props.theme.colors.primary};
    border: 4px solid ${props => props.theme.colors.lightBg};
    top: 20px;
    border-radius: 50%;
    z-index: 1;
  }
  
  &:nth-child(even)::after {
    left: -10px;
    right: auto;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding-left: 50px;
    padding-right: 0;
    
    &:nth-child(even) {
      margin-left: 0;
      padding-left: 50px;
    }
    
    &::after, &:nth-child(even)::after {
      left: 10px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.lightBg};
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TimelineDate = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

const TimelineCompany = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.textSecondary};
`;

const TimelineDescription = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

// Skill data
const skillsData = [
  {
    category: "Frontend Development",
    icon: <FiCode />,
    skills: [
      { name: "React.js", percentage: 95 },
      { name: "JavaScript/TypeScript", percentage: 92 },
      { name: "HTML5/CSS3", percentage: 90 },
      { name: "Redux", percentage: 88 },
      { name: "Next.js", percentage: 85 }
    ]
  },
  {
    category: "Backend Development",
    icon: <FiServer />,
    skills: [
      { name: "Node.js", percentage: 88 },
      { name: "Express.js", percentage: 85 },
      { name: "RESTful APIs", percentage: 90 },
      { name: "Python", percentage: 90 },
      { name: "Java", percentage: 75 }
    ]
  },
  {
    category: "Database",
    icon: <FiDatabase />,
    skills: [
      { name: "MongoDB", percentage: 80 },
      { name: "PostgreSQL", percentage: 80 },
      { name: "Firebase", percentage: 90 },
      { name: "Redis", percentage: 60 },
      { name: "MySQL", percentage: 90 }
    ]
  },
  {
    category: "UI/UX Design",
    icon: <FiLayers />,
    skills: [
      { name: "Responsive Design", percentage: 95 },
      { name: "UI Frameworks", percentage: 92 },
      { name: "Figma", percentage: 85 },
      { name: "Animation", percentage: 88 },
      { name: "Accessibility", percentage: 80 }
    ]
  },
  {
    category: "DevOps & Tools",
    icon: <FiTool />,
    skills: [
      { name: "Git/GitHub", percentage: 95 },
      { name: "Docker", percentage: 80 },
      { name: "CI/CD", percentage: 78 },
      { name: "AWS", percentage: 75 },
      { name: "Testing", percentage: 85 }
    ]
  },
  {
    category: "Security & Performance",
    icon: <FiShield />,
    skills: [
      { name: "Web Security", percentage: 85 },
      { name: "Performance Optimization", percentage: 90 },
      { name: "Authentication", percentage: 88 },
      { name: "Code Splitting", percentage: 85 },
      { name: "SEO", percentage: 80 }
    ]
  }
];

// Tags data
const tagsData = [
  { name: "React.js", size: 3 },
  { name: "JavaScript", size: 3 },
  { name: "Node.js", size: 3 },
  { name: "Express", size: 2 },
  { name: "Python", size: 3 },
  { name: "Java", size: 1 },
  { name: "FastAPI", size: 2 },
  { name: "MongoDB", size: 1 },
  { name: "PostgreSQL", size: 2 },
  { name: "Next.js", size: 2 },
  { name: "GraphQL", size: 1 },
  { name: "HTML5", size: 2 },
  { name: "Sass", size: 1 },
  { name: "Tailwind CSS", size: 1 },
  { name: "Material UI", size: 1 },
  { name: "Styled Components", size: 2 },
  { name: "Jest", size: 1 },
  { name: "Git", size: 2 },
  { name: "GitHub", size: 2 },
  { name: "Responsive Design", size: 2 },
  { name: "Firebase", size: 2 },
  { name: "AWS", size: 1 },
  { name: "Figma", size: 1 },
  { name: "Docker", size: 1 },
  { name: "CI/CD", size: 1 },
  { name: "RESTful APIs", size: 2 },
  { name: "Performance Optimization", size: 1 }
];

// Experience data
const experienceData = [
  {
    date: "2023 - 2025",
    title: "Software Engineer II",
    company: "JP Morgan Chase",
    description: "Developed and maintained backend services using Java Spring Boot, Python FastAPI, and Gaia MySQL. Collaborated with developers to deliver high-quality, responsive web experiences and backend services."
  },
  {
    date: "2022 - 2023",
    title: "Full Stack Developer",
    company: "Wiley Edge",
    description: "Developed full-stack web applications using React.js and Java Spring Boot. Collaborated with designers and backend developers to deliver high-quality, responsive web experiences and backend services."
  },
  {
    date: "2017 - 2022",
    title: "Frontend Developer",
    company: "SavageNode",
    description: "Built responsive user interfaces using modern JavaScript frameworks. Implemented pixel-perfect designs and optimized web performance."
  },
  {
    date: "2015 - 2017",
    title: "Web Developer",
    company: "StartUp Ventures",
    description: "Created and maintained websites for various clients. Worked with JavaScript, HTML, CSS, and basic backend technologies."
  }
];

const Skills = () => {
  // Refs for intersection observer
  const categoriesRef = useRef(null);
  const tagsRef = useRef(null);
  const experienceRef = useRef(null);
  
  // Controls for animations
  const categoriesControl = useAnimation();
  const tagsControl = useAnimation();
  const experienceControl = useAnimation();
  
  // InView for intersection observer
  const categoriesInView = useInView(categoriesRef, { once: false, amount: 0.2 });
  const tagsInView = useInView(tagsRef, { once: false, amount: 0.2 });
  const experienceInView = useInView(experienceRef, { once: false, amount: 0.2 });
  
  // Animate when in view
  useEffect(() => {
    if (categoriesInView) {
      categoriesControl.start('visible');
    }
    
    if (tagsInView) {
      tagsControl.start('visible');
    }
    
    if (experienceInView) {
      experienceControl.start('visible');
    }
  }, [categoriesInView, tagsInView, experienceInView, categoriesControl, tagsControl, experienceControl]);
  
  return (
    <SkillsContainer>
      <PageHeader>
        <PageTitle>My <span>Skills</span></PageTitle>
        <PageDescription>
          A comprehensive overview of my technical expertise and proficiency levels across various technologies and frameworks.
        </PageDescription>
      </PageHeader>
      
      <SkillsCategoriesContainer 
        ref={categoriesRef}
        as={motion.div}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="hidden"
        animate={categoriesControl}
      >
        {skillsData.map((category, index) => (
          <CategoryCard
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.category}</CategoryTitle>
            </CategoryHeader>
            
            <SkillsList>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skillIndex}>
                  <SkillHeader>
                    <SkillName>{skill.name}</SkillName>
                    <SkillPercentage>{skill.percentage}%</SkillPercentage>
                  </SkillHeader>
                  <ProgressBarContainer>
                    <ProgressBar 
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: 0.2 * skillIndex }}
                    />
                  </ProgressBarContainer>
                </SkillItem>
              ))}
            </SkillsList>
          </CategoryCard>
        ))}
      </SkillsCategoriesContainer>
      
      <SkillTagsContainer ref={tagsRef}>
        <SkillTagsTitle>Technology <span>Stack</span></SkillTagsTitle>
        
        <TagsCloud
          as={motion.div}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate={tagsControl}
        >
          {tagsData.map((tag, index) => (
            <SkillTag
              key={index}
              size={tag.size}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag.name}
            </SkillTag>
          ))}
        </TagsCloud>
      </SkillTagsContainer>
      
      <ExperienceSection ref={experienceRef}>
        <ExperienceTitle>Work <span>Experience</span></ExperienceTitle>
        
        <TimelineContainer
          as={motion.div}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate={experienceControl}
        >
          {experienceData.map((item, index) => (
            <TimelineItem
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <TimelineContent>
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineCompany>{item.company}</TimelineCompany>
                <TimelineDescription>{item.description}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ExperienceSection>
    </SkillsContainer>
  );
};

export default Skills; 