import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import '@testing-library/jest-dom';

// Mock the Thumbnail component
jest.mock('../Thumbnail', () => ({ itemId, image, title }) => (
  <div data-testid="thumbnail-mock">
    {title} - {itemId} - {image}
  </div>
));

// Mock the items module
jest.mock('../../items', () => ({
  itemImages: {
    img1: 'path/to/image1.jpg',
    img2: 'path/to/image2.jpg'
  }
}));

describe('Home Component', () => {
  const mockItems = [
    {
      itemId: '1',
      title: 'Course 1',
      description: 'Description 1',
      price: 99,
      salePrice: 79,
      imageId: 'img1'
    },
    {
      itemId: '2',
      title: 'Course 2',
      description: 'Description 2',
      price: 129,
      salePrice: 99,
      imageId: 'img2'
    }
  ];

  test('matches home component snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Home items={mockItems} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders welcome banner', () => {
    render(
      <BrowserRouter>
        <Home items={mockItems} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Welcome to Pathfinder')).toBeInTheDocument();
    expect(screen.getByText(/Start Career Assessment/)).toBeInTheDocument();
  });

  test('displays featured courses', () => {
    render(
      <BrowserRouter>
        <Home items={mockItems} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Featured Courses')).toBeInTheDocument();
    expect(screen.getAllByTestId('thumbnail-mock')).toHaveLength(2);
  });

  test('shows mentorship section', () => {
    render(
      <BrowserRouter>
        <Home items={mockItems} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Mentorship Sessions')).toBeInTheDocument();
    expect(screen.getByText('Schedule Appointment')).toBeInTheDocument();
  });

  test('displays job resources section', () => {
    render(
      <BrowserRouter>
        <Home items={mockItems} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Job Search Resources')).toBeInTheDocument();
    const linkedInElement = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInElement).toBeInTheDocument();
    expect(linkedInElement).toHaveAttribute('href', 'https://www.linkedin.com/jobs');
  });
});