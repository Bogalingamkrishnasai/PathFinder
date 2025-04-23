import { renderHook } from '@testing-library/react-hooks';
import CurrentUserContext, { useCurrentUserContext } from './CurrentUserContext';
import { useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('CurrentUserContext', () => {
  test('provides context with display name', () => {
    expect(CurrentUserContext.displayName).toBe('CurrentUserContext');
  });

  test('useCurrentUserContext returns context value', () => {
    const mockContextValue = { currentUser: { username: 'testuser' } };
    useContext.mockReturnValue(mockContextValue);

    const { result } = renderHook(() => useCurrentUserContext());
    expect(result.current).toEqual(mockContextValue);
  });

  test('throws error when used outside provider', () => {
    useContext.mockReturnValue(undefined);
    
    const { result } = renderHook(() => useCurrentUserContext());
    expect(result.error).toBeDefined();
    expect(result.error.message).toContain('useCurrentUserContext must be used within a CurrentUserContext.Provider');
  });
});