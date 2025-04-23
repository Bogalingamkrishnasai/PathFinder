import { render, screen, fireEvent } from '@testing-library/react';
import Roadmap from '../Roadmap';

describe('Roadmap Component', () => {
  test('renders career exploration title', () => {
    render(<Roadmap />);
    expect(screen.getByText('Explore Your Tech Career Path')).toBeInTheDocument();
  });

  test('displays career cards', () => {
    render(<Roadmap />);
    expect(screen.getByText('Building user interfaces and applications')).toBeInTheDocument();
    expect(screen.getByText('Analyzing data and trends')).toBeInTheDocument();
  });

  test('shows details when career is clicked', () => {
    render(<Roadmap />);
    const firstCareer = screen.getByText('Building user interfaces and applications');
    fireEvent.click(firstCareer);
    
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });
});