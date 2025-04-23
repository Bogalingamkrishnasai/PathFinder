import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../Alert';

// Mock CSS imports
jest.mock('../Alert.css', () => ({}));

describe('Alert Component', () => {
  test('renders children when visible', () => {
    render(<Alert visible type="success">Test message</Alert>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).not.toHaveAttribute('hidden');
  });

  test('renders hidden when not visible', () => {  // Changed test name and expectation
    render(<Alert visible={false} type="success">Test message</Alert>);
    const alert = screen.getByRole('alert', { hidden: true });
    expect(alert).toHaveAttribute('hidden');
  });

  test('applies correct styles for success type', () => {
    render(<Alert visible type="success">Test</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle('background-color: #adc6a8');
  });

  test('matches snapshot when visible', () => {
    const { asFragment } = render(<Alert visible type="success">Test message</Alert>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot when not visible', () => {  // Added new snapshot test
    const { asFragment } = render(<Alert visible={false} type="success">Test message</Alert>);
    expect(asFragment()).toMatchSnapshot();
  });
});