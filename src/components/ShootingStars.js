import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const ShootingStarAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(215deg) scale(0);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-500px) translateY(500px) rotate(215deg) scale(1);
  }
`;

const TwinkleAnimation = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background-color: transparent;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #fff;
  border-radius: 50%;
  opacity: ${props => props.brightness};
  animation: ${TwinkleAnimation} ${props => props.twinkleSpeed}s ease-in-out infinite;
`;

const ShootingStar = styled.div`
  position: absolute;
  width: ${props => props.length || 80}px;
  height: 2px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  border-radius: 50%;
  opacity: 0;
  z-index: 1;
  box-shadow: 0 0 10px 0 #ffffff;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  animation: ${ShootingStarAnimation} ${props => props.duration}s linear ${props => props.delay}s;
  animation-iteration-count: infinite;
`;

const ShootingStars = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  
  useEffect(() => {
    // Generate fixed stars
    const generateStars = () => {
      const starCount = window.innerWidth < 768 ? 100 : 200;
      const newStars = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          top: Math.random() * window.innerHeight,
          left: Math.random() * window.innerWidth,
          size: Math.random() * 2 + 1,
          brightness: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 10 + 5
        });
      }
      
      setStars(newStars);
    };
    
    // Generate shooting stars
    const generateShootingStars = () => {
      const shootingStarCount = window.innerWidth < 768 ? 5 : 10;
      const newShootingStars = [];
      
      for (let i = 0; i < shootingStarCount; i++) {
        newShootingStars.push({
          id: i,
          top: Math.random() * window.innerHeight * 0.7,
          left: Math.random() * window.innerWidth + 300,
          length: Math.random() * 100 + 50,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 10
        });
      }
      
      setShootingStars(newShootingStars);
    };
    
    generateStars();
    generateShootingStars();
    
    // Regenerate on window resize
    const handleResize = () => {
      generateStars();
      generateShootingStars();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <BackgroundContainer>
      {stars.map(star => (
        <Star
          key={star.id}
          top={star.top}
          left={star.left}
          size={star.size}
          brightness={star.brightness}
          twinkleSpeed={star.twinkleSpeed}
          style={{ top: `${star.top}px`, left: `${star.left}px` }}
        />
      ))}
      
      {shootingStars.map(shootingStar => (
        <ShootingStar
          key={shootingStar.id}
          top={shootingStar.top}
          left={shootingStar.left}
          length={shootingStar.length}
          duration={shootingStar.duration}
          delay={shootingStar.delay}
        />
      ))}
    </BackgroundContainer>
  );
};

export default ShootingStars; 