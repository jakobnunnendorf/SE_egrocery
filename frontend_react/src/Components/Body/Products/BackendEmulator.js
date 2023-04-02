import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function BackendEmulator({ activeFilters, addMatchingProducts,  purchasedItems}) {
  const [test_data, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      // console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
    // console.log("if we can see this the fetchproducts function is called")
  }, []);

  async function getProductsByCategory(category) {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/product/by_category', {
        category,
      });

      const products = response.data;
      setProducts(products);
      addMatchingProducts(products);
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const updateProductQuantities = useCallback((purchasedItems) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const purchasedItem = purchasedItems.find((item) => item._id === product._id);

        if (purchasedItem) {
          return {
            ...product,
            quantity: product.quantity - purchasedItem.quantity,
          };
        }

        return product;
      })
    );
  }, []);

  useEffect(() => {
    if (purchasedItems && purchasedItems.length > 0) {
      updateProductQuantities(purchasedItems);
    }
  }, [purchasedItems, updateProductQuantities]);

  async function getProductsByCategories(categories) {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/product/by_categories', {
        categories,
      });

      const products = response.data;
      setProducts(products);
      addMatchingProducts(products);
      // console.log("products by categories", products)
      // console.log("active filters", activeFilters)
      return products;
    } catch (error) {
      console.error('Error fetching products by categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  
   useEffect(() => {
  //getProductsByCategory(activeFilters[0]);
   // Uncomment the line below to use `getProductsByCategories` instead
      getProductsByCategories(activeFilters);
   }, [activeFilters]);

  return <></>;
}
