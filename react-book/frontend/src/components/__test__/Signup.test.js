import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../Signup';
import axios from 'axios';

jest.mock('axios');

describe('Signup Component', () => {
  const mockSetCurrentUser = jest.fn();

  beforeEach(() => {
    jest.spyOn(require('../contexts/CurrentUserContext'), 'useCurrentUserContext').mockReturnValue({
      setCurrentUser: mockSetCurrentUser
    });
  });

  test('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByText('Create Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('shows error when signup fails', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'Username taken' } } });
    
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign Up'));
    
    await waitFor(() => {
      expect(screen.getByText('There was an error signing up.')).toBeInTheDocument();
    });
  });

  test('navigates to login', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Log In')).toHaveAttribute('href', '/login');
  });
});