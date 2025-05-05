import React from 'react';
import styled from 'styled-components';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: ${props => props.theme.colors.lightBg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px 0;
  position: relative;
  z-index: 2;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  font-size: 0.9rem;
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Divider = styled.hr`
  width: 50%;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>
          Savage<span>Node</span>
        </Logo>
        
        <SocialLinks>
          <SocialLink href="https://github.com/SavageNode" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/dejan-savic-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </SocialLink>
          <SocialLink href="mailto:savic.dejan.business@gmail.com" aria-label="Email">
            <FiMail />
          </SocialLink>
        </SocialLinks>
        
        <FooterNav>
          <FooterLink href="">About</FooterLink>
          <FooterLink href="skills">Services</FooterLink>
          <FooterLink href="projects">Portfolio</FooterLink>
          <FooterLink href="contact">Contact</FooterLink>
        </FooterNav>
        
        <Divider />
        
        <Copyright>
          &copy; {currentYear} SavageNode by Dejan Savic. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 