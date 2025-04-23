import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../Quiz';

describe('Quiz Component', () => {
  test('renders first question', () => {
    render(<Quiz />);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('What do you enjoy most?')).toBeInTheDocument();
  });

  test('progresses through questions', () => {
    render(<Quiz />);
    const firstOption = screen.getAllByRole('button')[0];
    fireEvent.click(firstOption);
    
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  test('shows results after last question', () => {
    render(<Quiz />);
    
    // Answer all questions
    const questions = screen.getAllByRole('button');
    questions.forEach(question => {
      fireEvent.click(question);
    });
    
    expect(screen.getByText('Your Recommended Career:')).toBeInTheDocument();
  });
});