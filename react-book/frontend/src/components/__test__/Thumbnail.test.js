import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Thumbnail from '../Thumbnail';

describe('Thumbnail Component', () => {
  test('renders thumbnail with title and image', () => {
    render(
      <BrowserRouter>
        <Thumbnail itemId="1" image="test.jpg" title="Test Item" />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/details/1');
  });
});