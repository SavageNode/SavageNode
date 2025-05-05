import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiCode, FiLayout, FiServer, FiDatabase, FiCpu, FiStar } from 'react-icons/fi';

// Components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

// Hero Section
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
  text-align: center;
  position: relative;
`;

const StyledTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: 20px;
  
  span {
    color: ${props => props.theme.colors.primary};
    display: inline-block;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.3rem);
  max-width: 800px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 40px;
`;

const CallToActionButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(108, 92, 231, 0.3);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  p {
    font-size: 0.9rem;
    opacity: 0.6;
  }
  
  div {
    width: 30px;
    height: 50px;
    border: 2px solid ${props => props.theme.colors.textSecondary};
    border-radius: 15px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 50%;
      width: 6px;
      height: 6px;
      background-color: ${props => props.theme.colors.primary};
      border-radius: 50%;
      transform: translateX(-50%);
      animation: scroll 2s infinite;
    }
    
    @keyframes scroll {
      0% {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, 20px);
        opacity: 0;
      }
    }
  }
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const SectionDescription = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.lightBg};
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
`;

// Interactive Demo Section
const DemoSection = styled.section`
  padding: 0 20px;
`;

const InteractiveDemo = styled.div`
  background-color: ${props => props.theme.colors.lightBg};
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  max-width: 1000px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  margin-top: 30px;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const TabContent = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  min-height: 300px;
`;

// Counter Section
const CounterSection = styled.section`
  padding: 0 20px;
`;

const CountersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

const CounterItem = styled(motion.div)`
  background-color: ${props => props.theme.colors.lightBg};
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CounterNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const CounterLabel = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Home Component
const Home = () => {
  const [activeTab, setActiveTab] = useState('component1');
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    awards: 0
  });
  
  // Refs for intersection observer
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  const countersRef = useRef(null);
  
  // Controls for animations
  const featuresControl = useAnimation();
  const demoControl = useAnimation();
  const countersControl = useAnimation();
  
  // InView for intersection observer
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const demoInView = useInView(demoRef, { once: false, amount: 0.3 });
  const countersInView = useInView(countersRef, { once: false, amount: 0.3 });
  
  // Animate when in view
  useEffect(() => {
    if (featuresInView) {
      featuresControl.start('visible');
    }
    
    if (demoInView) {
      demoControl.start('visible');
    }
    
    if (countersInView) {
      countersControl.start('visible');
      
      // Animate counters
      const targetCounters = {
        projects: 150,
        clients: 85,
        experience: 7,
        awards: 12
      };
      
      const duration = 2000; // 2 seconds
      const frameRate = 20; // Update every 20ms
      const totalFrames = duration / frameRate;
      
      let frame = 0;
      
      const timer = setInterval(() => {
        frame++;
        
        const progress = frame / totalFrames;
        
        setCounters({
          projects: Math.floor(progress * targetCounters.projects),
          clients: Math.floor(progress * targetCounters.clients),
          experience: Math.floor(progress * targetCounters.experience),
          awards: Math.floor(progress * targetCounters.awards)
        });
        
        if (frame === totalFrames) {
          clearInterval(timer);
          setCounters(targetCounters);
        }
      }, frameRate);
      
      return () => clearInterval(timer);
    }
  }, [featuresInView, demoInView, countersInView, featuresControl, demoControl, countersControl]);
  
  const demoComponents = {
    component1: (
      <div>
        <h3>Interactive Form Component</h3>
        <p>A clean, validated form with real-time feedback and animated transitions.</p>
        <form style={{ marginTop: '20px' }}>
          <input type="text" placeholder="Name" style={{ padding: '10px', margin: '5px 0', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '5px', color: 'white' }} />
          <input type="email" placeholder="Email" style={{ padding: '10px', margin: '5px 0', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '5px', color: 'white' }} />
          <textarea placeholder="Message" rows="4" style={{ padding: '10px', margin: '5px 0', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '5px', color: 'white', resize: 'vertical' }}></textarea>
          <button style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#6c5ce7', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    ),
    component2: (
      <div>
        <h3>Data Visualization</h3>
        <p>Interactive charts and graphs for data visualization.</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px', flexWrap: 'wrap' }}>
          {/* Simple chart visualization */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', height: '200px', alignItems: 'flex-end', gap: '15px' }}>
              {[75, 45, 90, 60, 80].map((height, index) => (
                <div
                  key={index}
                  style={{
                    width: '30px',
                    height: `${height}%`,
                    backgroundColor: '#6c5ce7',
                    borderRadius: '5px',
                    transition: 'height 1s ease'
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                <span key={index} style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    component3: (
      <div>
        <h3>Animation Showcase</h3>
        <p>Smooth animations powered by Framer Motion.</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
              borderRadius: ["20%", "50%", "20%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            }}
          />
        </div>
      </div>
    ),
    component4: (
      <div>
        <h3>State Management Demo</h3>
        <p>A simple counter implementation to demonstrate state management.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
          <button 
            onClick={() => setCounters(prev => ({ ...prev, demo: (prev.demo || 0) - 1 }))}
            style={{ padding: '10px 20px', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}
          >
            -
          </button>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>
            {counters.demo || 0}
          </div>
          <button 
            onClick={() => setCounters(prev => ({ ...prev, demo: (prev.demo || 0) + 1 }))}
            style={{ padding: '10px 20px', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}
          >
            +
          </button>
        </div>
      </div>
    )
  };
  
  return (
    <HomeContainer>
      <HeroSection>
        <StyledTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          React Developer <span>Showcase</span>
        </StyledTitle>
        
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A modern portfolio demonstrating advanced React concepts, stunning UI components, and interactive experiences built by Dejan Savic.
        </Subtitle>
        
        <CallToActionButton
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Projects
        </CallToActionButton>
        
        <ScrollIndicator
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p>Scroll Down</p>
          <div></div>
        </ScrollIndicator>
      </HeroSection>
      
      <FeaturesSection ref={featuresRef}>
        <motion.div variants={staggerContainer} initial="hidden" animate={featuresControl}>
          <SectionTitle variants={fadeIn}>
            Why Choose <span>SavageNode</span>?
          </SectionTitle>
          
          <SectionDescription variants={fadeIn}>
            Expert React development services delivering exceptional user experiences through clean code, beautiful interfaces, and optimal performance.
          </SectionDescription>
          
          <FeaturesGrid>
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiCode /></IconContainer>
              <FeatureTitle>Clean Code</FeatureTitle>
              <FeatureDescription>
                Writing maintainable, scalable code following best practices and design patterns.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiLayout /></IconContainer>
              <FeatureTitle>Modern UI/UX</FeatureTitle>
              <FeatureDescription>
                Creating beautiful, responsive interfaces with attention to detail and user experience.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiServer /></IconContainer>
              <FeatureTitle>Full-Stack</FeatureTitle>
              <FeatureDescription>
                Comprehensive solutions from front-end excellence to robust back-end integration.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiDatabase /></IconContainer>
              <FeatureTitle>State Management</FeatureTitle>
              <FeatureDescription>
                Expert implementation of Context API, Redux, and other state management solutions.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiCpu /></IconContainer>
              <FeatureTitle>Performance</FeatureTitle>
              <FeatureDescription>
                Optimized applications with fast load times and smooth interactions.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard variants={fadeIn}>
              <IconContainer><FiStar /></IconContainer>
              <FeatureTitle>Innovation</FeatureTitle>
              <FeatureDescription>
                Staying ahead with the latest frameworks, tools, and techniques in React development.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </motion.div>
      </FeaturesSection>
      
      <DemoSection ref={demoRef}>
        <motion.div variants={staggerContainer} initial="hidden" animate={demoControl}>
          <SectionTitle variants={fadeIn}>
            Interactive <span>Components</span>
          </SectionTitle>
          
          <SectionDescription variants={fadeIn}>
            Explore a selection of interactive React components showcasing advanced functionality and modern design.
          </SectionDescription>
          
          <InteractiveDemo variants={fadeIn}>
            <TabContainer>
              <TabButtons>
                <TabButton 
                  active={activeTab === 'component1'} 
                  onClick={() => setActiveTab('component1')}
                >
                  Form Component
                </TabButton>
                <TabButton 
                  active={activeTab === 'component2'} 
                  onClick={() => setActiveTab('component2')}
                >
                  Data Visualization
                </TabButton>
                <TabButton 
                  active={activeTab === 'component3'} 
                  onClick={() => setActiveTab('component3')}
                >
                  Animation
                </TabButton>
                <TabButton 
                  active={activeTab === 'component4'} 
                  onClick={() => setActiveTab('component4')}
                >
                  State Management
                </TabButton>
              </TabButtons>
              
              <TabContent
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {demoComponents[activeTab]}
              </TabContent>
            </TabContainer>
          </InteractiveDemo>
        </motion.div>
      </DemoSection>
      
      <CounterSection ref={countersRef}>
        <motion.div variants={staggerContainer} initial="hidden" animate={countersControl}>
          <SectionTitle variants={fadeIn}>
            Achievements & <span>Experience</span>
          </SectionTitle>
          
          <SectionDescription variants={fadeIn}>
            Numbers that reflect years of dedication and success in delivering exceptional React applications.
          </SectionDescription>
          
          <CountersContainer>
            <CounterItem variants={fadeIn}>
              <CounterNumber>{counters.projects}+</CounterNumber>
              <CounterLabel>Projects Completed</CounterLabel>
            </CounterItem>
            
            <CounterItem variants={fadeIn}>
              <CounterNumber>{counters.clients}+</CounterNumber>
              <CounterLabel>Satisfied Clients</CounterLabel>
            </CounterItem>
            
            <CounterItem variants={fadeIn}>
              <CounterNumber>{counters.experience}+</CounterNumber>
              <CounterLabel>Years Experience</CounterLabel>
            </CounterItem>
            
            <CounterItem variants={fadeIn}>
              <CounterNumber>{counters.awards}+</CounterNumber>
              <CounterLabel>Awards</CounterLabel>
            </CounterItem>
          </CountersContainer>
        </motion.div>
      </CounterSection>
    </HomeContainer>
  );
};

export default Home; 