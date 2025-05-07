import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Alert, Skeleton, Fade, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePageTitle } from '../../context/PageTitleContext';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
});

const Contact = () => {
  const { setPageTitle } = usePageTitle();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    setPageTitle('Contact');
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setPageTitle]);

  const onSubmit = (data) => {
    setSubmitting(true);
    console.log(data);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        reset();
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  if (loading) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Contact Me
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={120} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" height={50} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Contact Me
      </Typography>
      
      {submitted && (
        <Alert severity="success" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
          Message sent successfully!
        </Alert>
      )}
      
      <Fade in={!loading} timeout={800}>
        <Box 
          component="form" 
          noValidate 
          onSubmit={handleSubmit(onSubmit)}
          sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                {...register('message')}
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={submitting}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                sx={{ 
                  py: 1.5,
                  bgcolor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#333333'
                  }
                }}
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default Contact; 