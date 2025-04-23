import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserDetails from '../UserDetails';
import axios from 'axios';

jest.mock('axios');
jest.mock('../contexts/CurrentUserContext');

describe('UserDetails Component', () => {
  const mockSetCurrentUser = jest.fn();

  beforeEach(() => {
    jest.spyOn(require('../contexts/CurrentUserContext'), 'useCurrentUserContext').mockReturnValue({
      currentUser: {},
      setCurrentUser: mockSetCurrentUser
    });
  });

  test('shows login link when not logged in', () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('displays username when logged in', () => {
    jest.spyOn(require('../contexts/CurrentUserContext'), 'useCurrentUserContext').mockReturnValue({
      currentUser: { username: 'testuser' },
      setCurrentUser: mockSetCurrentUser
    });
    
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  test('shows orders link for associates', () => {
    jest.spyOn(require('../contexts/CurrentUserContext'), 'useCurrentUserContext').mockReturnValue({
      currentUser: { username: 'associate', access: 'associate' },
      setCurrentUser: mockSetCurrentUser
    });
    
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  test('logs out when logout button clicked', async () => {
    jest.spyOn(require('../contexts/CurrentUserContext'), 'useCurrentUserContext').mockReturnValue({
      currentUser: { username: 'testuser' },
      setCurrentUser: mockSetCurrentUser
    });
    axios.post.mockResolvedValue({});
    
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Log Out'));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/auth/logout', {});
    });
  });
});