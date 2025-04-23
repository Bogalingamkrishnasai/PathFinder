import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';

jest.mock('axios');

const mockItems = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 20 },
];

const mockUser = { id: 1, name: 'John Doe' };

describe('App Component', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url === '/api/items') {
        return Promise.resolve({ data: mockItems });
      }
      if (url === '/api/auth/current-user') {
        return Promise.resolve({ data: mockUser });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  test('renders loading screen initially', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders Home component with loaded items', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const item = await screen.findByText(/item 1/i);
    expect(item).toBeInTheDocument();
  });

  test('renders Cart page', async () => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/your cart/i)).toBeInTheDocument();
  });

  test('renders NotFound page for invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  test('renders Login, Signup, Quiz, Orders, Appointments, and Roadmap routes', async () => {
    const paths = [
      ['/login', /login/i],
      ['/signup', /signup/i],
      ['/orders', /your orders/i],
      ['/quiz', /career quiz/i],
      ['/schedule-appointment', /schedule/i],
      ['/manage-appointment', /manage/i],
      ['/roadmap', /roadmap/i],
    ];

    for (const [path, expectedText] of paths) {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );
      expect(await screen.findByText(expectedText)).toBeInTheDocument();
    }
  });
});
