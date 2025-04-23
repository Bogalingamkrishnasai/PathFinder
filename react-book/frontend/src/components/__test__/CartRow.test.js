import { render, screen, fireEvent } from '@testing-library/react';
import CartRow from '../CartRow';

describe('CartRow Component', () => {
  const mockCartItem = { itemId: '1', quantity: 2 };
  const mockItems = [{ itemId: '1', title: 'Test Item', price: 10, salePrice: 8 }];
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart item details', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <CartRow cartItem={mockCartItem} dispatch={mockDispatch} items={mockItems} />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('$16.00')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls dispatch when remove button is clicked', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <CartRow cartItem={mockCartItem} dispatch={mockDispatch} items={mockItems} />
        </tbody>
      </table>
    );
    
    fireEvent.click(screen.getByText('X'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'REMOVE',
      itemId: '1'
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correctly with sale price', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <CartRow cartItem={mockCartItem} dispatch={mockDispatch} items={mockItems} />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('$16.00')).toBeInTheDocument(); // 2 × $8 sale price
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correctly with regular price when no sale price', () => {
    const itemsWithoutSale = [{ ...mockItems[0], salePrice: undefined }];
    const { asFragment } = render(
      <table>
        <tbody>
          <CartRow cartItem={mockCartItem} dispatch={mockDispatch} items={itemsWithoutSale} />
        </tbody>
      </table>
    );
    
    expect(screen.getByText('$20.00')).toBeInTheDocument(); // 2 × $10 regular price
    expect(asFragment()).toMatchSnapshot();
  });
});