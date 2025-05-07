import React, { useEffect, useState } from 'react';
import { Typography, Box, Avatar, Grid, LinearProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { usePageTitle } from '../../context/PageTitleContext';

const skills = [
  { name: 'HTML & CSS', value: 90, color: 'primary' },
  { name: 'JavaScript', value: 50, color: 'secondary' },
  { name: 'Unity & C#', value: 80, color: 'success' },
  { name: 'C++ & Data Structures', value: 75, color: 'warning' }
];

const SkillBar = ({ name, value, color, delay }) => {
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  useEffect(() => {
    let timer;
    if (inView) {
      timer = setTimeout(() => {
        setProgress(value);
      }, delay);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [inView, value, delay]);
  
  return (
    <Box ref={ref} sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body1" fontWeight="medium">{name}</Typography>
        <Typography variant="body2" fontWeight="bold">{progress}%</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        color={color}
        sx={{ 
          height: 10, 
          borderRadius: 5,
          backgroundColor: 'rgba(0,0,0,0.09)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            transition: 'transform 1.5s ease-in-out',
          }
        }}
      />
    </Box>
  );
};

const Home = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Home');
  }, [setPageTitle]);

  return (
    <Box sx={{ textAlign: 'center', py: 5 }}>
      <Avatar
        src={process.env.PUBLIC_URL + '/images/profile.jpg'}
        alt="Bilal Haroon"
        sx={{ 
          width: 150, 
          height: 150, 
          margin: '0 auto',
          marginBottom: 2,
          transition: 'transform 0.3s'
        }}
        className="profile-pic"
      />
      <Typography variant="h4" gutterBottom>Bilal Haroon</Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>Web Developer</Typography>
      <Typography variant="body1">Learning Web Dev | Developer | Internee</Typography>
      
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Box sx={{ textAlign: 'left', p: 2, mb: 4 }}>
          <Typography variant="h5" gutterBottom>About Me</Typography>
          <Typography variant="body1">
            I am a passionate web developer with skills in React, JavaScript, HTML, CSS, and other modern web technologies.
            I am currently enhancing my skills through internships and personal projects.
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'left', p: 2 }}>
          <Typography variant="h5" gutterBottom>Skills</Typography>
          <Grid container spacing={2}>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={6} key={index}>
                <SkillBar 
                  name={skill.name}
                  value={skill.value}
                  color={skill.color}
                  delay={index * 400}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home; 