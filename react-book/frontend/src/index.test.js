import { items, itemImages } from './index';

describe('items data', () => {
  test('contains correct number of items', () => {
    expect(items.length).toBe(6);
  });

  test('each item has required properties', () => {
    items.forEach(item => {
      expect(item).toHaveProperty('itemId');
      expect(item).toHaveProperty('imageId');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('price');
      expect(typeof item.price).toBe('number');
    });
  });

  test('some items have salePrice', () => {
    const itemsWithSalePrice = items.filter(item => 'salePrice' in item);
    expect(itemsWithSalePrice.length).toBeGreaterThan(0);
  });
});

describe('itemImages', () => {
  test('contains images for all items', () => {
    items.forEach(item => {
      expect(itemImages).toHaveProperty(item.imageId);
    });
  });
});