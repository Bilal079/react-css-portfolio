import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton, Fade } from '@mui/material';
import CustomTable from '../../components/CustomTable';
import { usePageTitle } from '../../context/PageTitleContext';

const Education = () => {
  const { setPageTitle } = usePageTitle();
  const [loading, setLoading] = useState(true);
  const [educationData, setEducationData] = useState(null);

  useEffect(() => {
    setPageTitle('Education');
    
    const timer = setTimeout(() => {
      setEducationData({
        headers: ['Degree', 'University', 'Year'],
        rows: [
          ['BSc Computer Science', 'Information Technology University', '2023-2027'],
          ['A-levels', 'Sicas Liberty Complex', '2021-2023'],
          ['O-levels', 'Sicas Liberty Complex', '2018-2021']
        ]
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [setPageTitle]);

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Education
      </Typography>
      
      {loading ? (
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Box>
      ) : (
        <Fade in={!loading} timeout={800}>
          <Box>
            <CustomTable data={educationData} />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default Education; 