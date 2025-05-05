import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 0;
  backdrop-filter: blur(10px);
  background: rgba(15, 15, 26, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100vh;
  background-color: ${props => props.theme.colors.background};
  z-index: 101;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
  margin: 10px 0;
  
  &::after {
    bottom: -8px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  return (
    <NavbarContainer style={{ boxShadow: scrolled ? '0 5px 15px rgba(0, 0, 0, 0.1)' : 'none' }}>
      <NavbarContent>
        <Logo to="/">
          Savage<span>Node</span>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Home
          </NavLink>
          <NavLink to="/projects" active={location.pathname === '/projects' ? 1 : 0}>
            Projects
          </NavLink>
          <NavLink to="/skills" active={location.pathname === '/skills' ? 1 : 0}>
            Skills
          </NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
            Contact
          </NavLink>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMenu}>
          <FiMenu />
        </MobileMenuButton>
        
        <AnimatePresence>
          {isOpen && (
            <>
              <Overlay 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              <MobileMenu
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <CloseButton onClick={toggleMenu}>
                  <FiX />
                </CloseButton>
                <MobileNavLink to="/" active={location.pathname === '/' ? 1 : 0}>
                  Home
                </MobileNavLink>
                <MobileNavLink to="/projects" active={location.pathname === '/projects' ? 1 : 0}>
                  Projects
                </MobileNavLink>
                <MobileNavLink to="/skills" active={location.pathname === '/skills' ? 1 : 0}>
                  Skills
                </MobileNavLink>
                <MobileNavLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>
                  Contact
                </MobileNavLink>
              </MobileMenu>
            </>
          )}
        </AnimatePresence>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar; 