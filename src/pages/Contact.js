import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub, FiTwitter } from 'react-icons/fi';

const ContactContainer = styled.div`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background-color: ${props => props.theme.colors.lightBg};
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 12px 30px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(108, 92, 231, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.lightBg};
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 30px;
  
  span {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
`;

const ContactText = styled.div`
  h3 {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-5px);
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(39, 174, 96, 0.1);
  border: 1px solid rgba(39, 174, 96, 0.3);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #2ecc71;
`;

const ErrorMessage = styled(motion.div)`
  background-color: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: #e74c3c;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const mailtoLink = `mailto:savic.dejan.business@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    
    // Open the mailto link
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitStatus('success');
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };
  
  return (
    <ContactContainer>
      <PageHeader>
        <PageTitle>Get In <span>Touch</span></PageTitle>
        <PageDescription>
          Have a project in mind or want to collaborate? Feel free to reach out through any of the channels below.
        </PageDescription>
      </PageHeader>
      
      <ContactContent>
        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormTitle>Send Me a <span>Message</span></FormTitle>
          
          {submitStatus === 'success' && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              Your message has been sent successfully! I'll get back to you as soon as possible.
            </SuccessMessage>
          )}
          
          {submitStatus === 'error' && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              There was an error sending your message. Please try again later.
            </ErrorMessage>
          )}
          
          <FormGroup>
            <InputLabel htmlFor="name">Your Name</InputLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="subject">Subject</InputLabel>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="message">Message</InputLabel>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
          </SubmitButton>
        </ContactForm>
        
        <ContactInfo>
          <InfoCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InfoTitle>Contact <span>Info</span></InfoTitle>
            
            <ContactMethod>
              <ContactIcon>
                <FiMail />
              </ContactIcon>
              <ContactText>
                <h3>Email</h3>
                <p>savic.dejan.business@gmail.com</p>
              </ContactText>
            </ContactMethod>
            
            <ContactMethod>
              <ContactIcon>
                <FiPhone />
              </ContactIcon>
              <ContactText>
                <h3>Phone</h3>
                <p>+1 (682) 203-7353</p>
              </ContactText>
            </ContactMethod>
            
            <ContactMethod>
              <ContactIcon>
                <FiMapPin />
              </ContactIcon>
              <ContactText>
                <h3>Location</h3>
                <p>Dallas, Texas</p>
              </ContactText>
            </ContactMethod>
            
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/in/dejan-savic-/" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}>
                <FiLinkedin />
              </SocialLink>
              <SocialLink href="https://github.com/SavageNode" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }}>
                <FiGithub />
              </SocialLink>
            </SocialLinks>
          </InfoCard>
          
          <InfoCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoTitle>My <span>Location</span></InfoTitle>
            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214592.19404771007!2d-96.896903665016!3d32.81868463616725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1746466969913!5m2!1sen!2sus" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Dallas Map"
              ></iframe>
            </MapContainer>
          </InfoCard>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact; 