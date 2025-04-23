import ItemType from './item';

describe('ItemType PropTypes', () => {
  test('validates correct item shape', () => {
    const props = {
      itemId: '1',
      imageId: 'img1',
      title: 'Test Item',
      price: 100,
      description: 'Test description',
      salePrice: 50
    };
    const result = ItemType(props, 'item', 'TestComponent');
    expect(result).toBeNull();
  });

  test('throws error for missing required prop', () => {
    const props = {
      imageId: 'img1',
      title: 'Test Item',
      price: 100
    };
    expect(() => ItemType(props, 'item', 'TestComponent'))
      .toThrowErrorMatchingSnapshot();
  });

  test('throws error for invalid prop type', () => {
    const props = {
      itemId: '1',
      imageId: 'img1',
      title: 'Test Item',
      price: '100', // Should be number
      description: 'Test description'
    };
    expect(() => ItemType(props, 'item', 'TestComponent'))
      .toThrowErrorMatchingSnapshot();
  });
});