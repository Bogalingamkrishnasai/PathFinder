import { render, screen, act } from '@testing-library/react';
import Orders from '../Orders';
import { useCurrentUserContext } from '../contexts/CurrentUserContext';

jest.mock('../contexts/CurrentUserContext');
jest.mock('axios');

describe('Orders Component', () => {
  const mockItems = [
    { itemId: '1', title: 'Item 1' },
    { itemId: '2', title: 'Item 2' }
  ];

  beforeEach(() => {
    useCurrentUserContext.mockReturnValue({
      currentUser: { access: 'associate' }
    });
  });

  test('renders empty state when no orders', () => {
    render(<Orders items={mockItems} />);
    expect(screen.getByText('No Orders')).toBeInTheDocument();
  });

  test('shows access denied for non-associates', () => {
    useCurrentUserContext.mockReturnValue({
      currentUser: { access: 'user' }
    });
    
    render(<Orders items={mockItems} />);
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
  });

  // Note: WebSocket testing would require additional setup
});