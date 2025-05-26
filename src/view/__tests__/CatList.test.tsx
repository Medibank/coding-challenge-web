import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CatList from '../CatList';
import { CatController } from '../../controller/CatController';

// Mock the controller
jest.mock('../../controller/CatController');

describe('CatList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('displays loading state initially', () => {
    // Mock the implementation to never resolve
    jest.spyOn(CatController.prototype, 'getCatsByOwnerGender').mockImplementation(
      () => new Promise(() => {})
    );
    
    render(<CatList />);
    
    expect(screen.getByText('Loading cat data...')).toBeInTheDocument();
  });
  
  it('displays cats grouped by gender when data is loaded', async () => {
    // Mock the implementation to return data
    jest.spyOn(CatController.prototype, 'getCatsByOwnerGender').mockResolvedValue({
      'Male': ['Felix', 'Garfield'],
      'Female': ['Whiskers']
    });
    
    render(<CatList />);
    
    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading cat data...')).not.toBeInTheDocument();
    });
    
    // Check that gender headings and cat names are displayed
    expect(screen.getByText('Cats By Owner Gender')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('Felix')).toBeInTheDocument();
    expect(screen.getByText('Garfield')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
  });
  
  it('displays error message when data loading fails', async () => {
    // Mock the implementation to throw an error
    jest.spyOn(CatController.prototype, 'getCatsByOwnerGender').mockRejectedValue(
      new Error('API Error')
    );
    
    render(<CatList />);
    
    // Wait for the error state
    await waitFor(() => {
      expect(screen.queryByText('Loading cat data...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Failed to load cat data. Please try again later.')).toBeInTheDocument();
  });
  
  it('displays a message when no cats are found', async () => {
    // Mock the implementation to return empty data
    jest.spyOn(CatController.prototype, 'getCatsByOwnerGender').mockResolvedValue({});
    
    render(<CatList />);
    
    // Wait for the data to load
    await waitFor(() => {
      expect(screen.queryByText('Loading cat data...')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('No cats found.')).toBeInTheDocument();
  });
});