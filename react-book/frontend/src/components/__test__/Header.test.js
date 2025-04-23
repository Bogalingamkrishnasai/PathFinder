import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';
import '@testing-library/jest-dom';
import React from 'react';

// 1. Create a mock context directly in the test file
const CurrentUserContext = React.createContext({
  currentUser: null,
  setCurrentUser: jest.fn()
});

// 2. Mock the UserDetails component to avoid context issues
jest.mock('../UserDetails', () => () => <div>Mock UserDetails</div>);

describe('Header Component', () => {
  const mockCart = [
    { itemId: '1', quantity: 2 },
    { itemId: '2', quantity: 1 }
  ];

  // Helper function to render the component
  const renderHeader = () => {
    return render(
      <CurrentUserContext.Provider value={{ currentUser: null, setCurrentUser: jest.fn() }}>
        <BrowserRouter>
          <Header cart={mockCart} />
        </BrowserRouter>
      </CurrentUserContext.Provider>
    );
  };

  test('renders header with logo and brand name', () => {
    renderHeader();
    
    expect(screen.getByAltText('Pathfinder Logo')).toBeInTheDocument();
    expect(screen.getByText('Pathfinder')).toBeInTheDocument();
  });

  test('renders search bar', () => {
    renderHeader();
    
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('displays correct cart quantity', () => {
    renderHeader();
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('has navigation links', () => {
    renderHeader();
    
    expect(screen.getByText('My Cart')).toBeInTheDocument();
    expect(screen.getByText('My Cart')).toHaveAttribute('href', '/cart');
  });

  test('matches snapshot', () => {
    const { asFragment } = renderHeader();
    expect(asFragment()).toMatchSnapshot();
  });
});