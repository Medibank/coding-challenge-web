import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenderSection from '../GenderSection';

describe('GenderSection', () => {
  it('renders the gender heading correctly', () => {
    render(<GenderSection gender="Male" catNames={['Felix', 'Garfield']} />);
    
    expect(screen.getByText('Male')).toBeInTheDocument();
  });
  
  it('renders all cat names in the list', () => {
    render(<GenderSection gender="Female" catNames={['Whiskers', 'Mittens', 'Luna']} />);
    
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
    expect(screen.getByText('Mittens')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });
  
  it('handles empty cat names array', () => {
    render(<GenderSection gender="Non-binary" catNames={[]} />);
    
    expect(screen.getByText('Non-binary')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});