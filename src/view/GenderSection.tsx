import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { Person } from '@mui/icons-material';

// Props interface for GenderSection component
interface GenderSectionProps {
  gender: string;
  catNames: string[];
}

// GenderSection component to display a gender heading and list of cat names
const GenderSection: React.FC<GenderSectionProps> = ({ gender, catNames }) => {
  return (
    <Paper elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Person color="primary" sx={{ mr: 1 }} />
        <Typography variant="h2" color="primary">
          {gender}
        </Typography>
      </Box>
      <List>
        {catNames.map((catName, index) => (
          <ListItem key={`${catName}-${index}`} sx={{ py: 0.5 }}>
            <ListItemText primary={catName} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GenderSection;