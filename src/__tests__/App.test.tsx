import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import CatList from '../view/CatList';

// Mock the CatList component
jest.mock('../view/CatList', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="cat-list-mock">Cat List Mock</div>)
}));

describe('App', () => {
  it('renders the CatList component', () => {
    render(<App />);
    
    expect(screen.getByTestId('cat-list-mock')).toBeInTheDocument();
    expect(CatList).toHaveBeenCalled();
  });
  
  it('renders with the correct container styling', () => {
    render(<App />);
    
    const appContainer = screen.getByTestId('cat-list-mock').parentElement;
    expect(appContainer).toHaveClass('min-h-screen');
    expect(appContainer).toHaveClass('bg-gray-50');
  });
});