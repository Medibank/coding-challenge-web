import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  AlertTitle 
} from '@mui/material';
import { Pets } from '@mui/icons-material';
import { CatController } from '../controller/CatController';
import { CatsByGender } from '../model/CatDataSource';
import GenderSection from './GenderSection';

// CatList component to display cats grouped by owner's gender
const CatList: React.FC = () => {
  const [catsByGender, setCatsByGender] = useState<CatsByGender>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const controller = new CatController();
        const data = await controller.getCatsByOwnerGender();
        setCatsByGender(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load cat data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCatData();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <Pets sx={{ mr: 1, fontSize: 35 }} color="primary" />
        <Typography variant="h1" component="h1" align="center" color="primary">
          Cats By Owner Gender
        </Typography>
      </Box>
      
      {Object.keys(catsByGender).length === 0 ? (
        <Alert severity="info">No cats found.</Alert>
      ) : (
        Object.entries(catsByGender).map(([gender, catNames]) => (
          <GenderSection key={gender} gender={gender} catNames={catNames} />
        ))
      )}
    </Container>
  );
};

export default CatList;