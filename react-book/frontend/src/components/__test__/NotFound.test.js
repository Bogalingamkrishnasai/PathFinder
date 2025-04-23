import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
  test('renders not found message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Return Home')).toHaveAttribute('href', '/');
  });
});