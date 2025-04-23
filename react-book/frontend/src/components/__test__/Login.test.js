import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock axios
jest.mock('axios');

// Mock the CurrentUserContext
const mockSetCurrentUser = jest.fn();
jest.mock('../../context/CurrentUserContext', () => ({
  useCurrentUserContext: () => ({
    currentUser: null,
    setCurrentUser: mockSetCurrentUser
  })
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form', () => {
    renderLogin();
    
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  test('shows error when login fails', async () => {
    axios.post.mockRejectedValue({ 
      response: { 
        data: { error: 'Invalid credentials' } 
      } 
    });
    
    renderLogin();
    
    fireEvent.change(screen.getByLabelText('Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'wrongpassword' } 
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('successful login calls setCurrentUser', async () => {
    const mockUser = { username: 'testuser', token: 'abc123' };
    axios.post.mockResolvedValue({ data: mockUser });
    
    renderLogin();
    
    fireEvent.change(screen.getByLabelText('Username'), { 
      target: { value: 'testuser' } 
    });
    fireEvent.change(screen.getByLabelText('Password'), { 
      target: { value: 'correctpassword' } 
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    
    await waitFor(() => {
      expect(mockSetCurrentUser).toHaveBeenCalledWith(mockUser);
    });
  });

  test('has signup link', () => {
    renderLogin();
    
    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});