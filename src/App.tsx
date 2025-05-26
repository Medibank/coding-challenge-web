import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import CatList from './view/CatList';

// Create a Material Design 3 theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4', // MD3 primary
    },
    secondary: {
      main: '#E8DEF8', // MD3 secondary
    },
    background: {
      default: '#F6F5FA', // MD3 background
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      marginBottom: '1.5rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-gray-50">
        <CatList />
      </div>
    </ThemeProvider>
  );
};

export default App;