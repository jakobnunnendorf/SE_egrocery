import { useEffect } from 'react';
import test_data from './test_data.js';
import { useCallback } from 'react';

const priceRanges = [
  { min: 0, max: 1, label: '0-1 $' },
  { min: 1, max: 3, label: '1-3 $' },
  { min: 3, max: 5, label: '3-5 $' },
  { min: 5, max: 10, label: '5-10 $' },
  { min: 10, max: 20, label: '10-20 $' },
  { min: 20, max: 50, label: '20-50 $' },
  { min: 50, max: Infinity, label: '>50 $' },
];

const categories = ['Beauty and personal care', 'Food and beverages', 'Alcohol and tobacco', 'Toys and games', 'Pet supplies', 'Home and kitchen', 'Stationery and office supplies', 'Category', 'Electronics and gaming', 'Party supplies', 'Tools and hardware', 'Automotive']

export default function BackendEmulator({ activeFilters, addMatchingProducts }) {
  function filterByPrice(product, selectedPrices) {
    return selectedPrices.some((priceLabel) => {
      const range = priceRanges.find((range) => range.label === priceLabel);
      return product.price >= range.min && product.price < range.max;
    });
  }

  function filterByCategory(product, selectedCategories) {
    return selectedCategories.some((category) => {
      return product.category === category;
    });
  }

  const findMatches = useCallback(
    (products, selectedFilters) => {
      const selectedPrices = selectedFilters.filter((filter) => priceRanges.some((range) => range.label === filter));
      const selectedCategories = selectedFilters.filter((filter) => categories.includes(filter));

      return products.filter((product) => {
        const priceMatch = selectedPrices.length === 0 || filterByPrice(product, selectedPrices);
        const categoryMatch = selectedCategories.length === 0 || filterByCategory(product, selectedCategories);

        return priceMatch && categoryMatch;
      });
    },
    []
  );

  useEffect(() => {
    addMatchingProducts(findMatches(test_data, activeFilters));
  }, [activeFilters, addMatchingProducts, findMatches]);

  return null
}