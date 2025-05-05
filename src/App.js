import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import ShootingStars from './components/ShootingStars';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

const theme = {
  colors: {
    primary: '#6c5ce7',
    secondary: '#a29bfe',
    accent: '#fd79a8',
    background: '#0f0f1a',
    lightBg: '#1a1a2e',
    text: '#f8f9fa',
    textSecondary: '#b8b9be',
  },
  fonts: {
    main: "'Poppins', sans-serif",
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    laptop: '992px',
    desktop: '1200px',
  },
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding: 80px 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <PageWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShootingStars />
          <Navbar />
          <ContentWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </ContentWrapper>
          <Footer />
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
