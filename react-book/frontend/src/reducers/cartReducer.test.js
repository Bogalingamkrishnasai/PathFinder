import { cartReducer, initialCartState, CartTypes } from './cartReducer';

describe('cartReducer', () => {
  test('returns initial state', () => {
    expect(cartReducer(undefined, {})).toEqual(initialCartState);
  });

  test('handles ADD action for new item', () => {
    const action = { type: CartTypes.ADD, itemId: '1' };
    const state = cartReducer(initialCartState, action);
    expect(state).toEqual([{ itemId: '1', quantity: 1 }]);
  });

  test('handles ADD action for existing item', () => {
    const initialState = [{ itemId: '1', quantity: 1 }];
    const action = { type: CartTypes.ADD, itemId: '1' };
    const state = cartReducer(initialState, action);
    expect(state).toEqual([{ itemId: '1', quantity: 2 }]);
  });

  test('handles EMPTY action', () => {
    const initialState = [{ itemId: '1', quantity: 1 }];
    const action = { type: CartTypes.EMPTY };
    const state = cartReducer(initialState, action);
    expect(state).toEqual(initialCartState);
  });

  test('handles REMOVE action', () => {
    const initialState = [
      { itemId: '1', quantity: 1 },
      { itemId: '2', quantity: 1 }
    ];
    const action = { type: CartTypes.REMOVE, itemId: '1' };
    const state = cartReducer(initialState, action);
    expect(state).toEqual([{ itemId: '2', quantity: 1 }]);
  });

  test('throws error for invalid action type', () => {
    expect(() => cartReducer(initialCartState, { type: 'INVALID' }))
      .toThrow('Invalid action type INVALID');
  });
});