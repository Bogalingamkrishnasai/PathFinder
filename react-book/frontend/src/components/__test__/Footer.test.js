import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  test('renders footer with sections and links', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Check for section headings
    expect(screen.getByText('Pathfinder')).toBeInTheDocument();
    expect(screen.getByText('Career Resources')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
    
    // Check for navigation links
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Career Blog')).toBeInTheDocument();

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders social media links', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.href.includes('twitter.com') || 
      link.href.includes('linkedin.com') || 
      link.href.includes('facebook.com')
    );
    expect(socialLinks).toHaveLength(3);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders copyright notice', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/© 2024 Pathfinder/i)).toBeInTheDocument();

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  // Dedicated snapshot test for full footer rendering
  test('matches footer snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});