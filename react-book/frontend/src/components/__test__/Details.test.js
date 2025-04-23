import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Details from '../Details';

// Mock the Outlet component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(() => <div data-testid="outlet-content">Outlet Content</div>),
}));

describe('Details Component Snapshots', () => {
  const mockItems = [
    { itemId: '1', title: 'Item 1', imageId: 'img1' },
    { itemId: '2', title: 'Item 2', imageId: 'img2' }
  ];

  test('matches sidebar snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Details items={mockItems} />
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches outlet snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Details items={mockItems} />}>
            <Route index element={<div>Default Content</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});