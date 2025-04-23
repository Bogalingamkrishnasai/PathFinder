import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailItem from '../DetailItem';
import '@testing-library/jest-dom';

// Mock useParams directly
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }), // Default mock value
}));

// Mock CSS imports
jest.mock('./DetailItem.css', () => ({}));

describe('DetailItem Component', () => {
  const mockItems = [{
    itemId: '1', // Must match the mocked useParams id
    title: 'Test Item',
    description: 'Test Description',
    price: 10,
    salePrice: 8,
    imageId: 'test-image'
  }];
  
  const mockAddToCart = jest.fn();

  test('should render item details when item exists', () => {
    // Render with router context
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/items/:id" element={
            <DetailItem items={mockItems} addToCart={mockAddToCart} />
          } />
        </Routes>
      </BrowserRouter>
    );

    // Debug the rendered output
    screen.debug();

    // Verify the item is found and rendered
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('$8.00')).toBeInTheDocument();
  });

  test('should show unknown item when item not found', () => {
    // Override useParams mock for this test
    require('react-router-dom').useParams.mockReturnValue({ id: '999' });
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/items/:id" element={
            <DetailItem items={mockItems} addToCart={mockAddToCart} />
          } />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Unknown Item')).toBeInTheDocument();
  });
});