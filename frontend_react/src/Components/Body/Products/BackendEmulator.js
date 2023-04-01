import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function BackendEmulator({ activeFilters, addMatchingProducts }) {
  const [test_data, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  async function fetchProducts() {
    //console.log("commencing fetch products")
    setIsLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
      console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }

  useEffect(() => {
      fetchProducts();
    }, []);
  

  async function getProductsByCategory(category) {
    console.log('fetching prod by category');
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/product/by_category', {
        category,
      });
  
      const products = response.data;
      console.log(products);
      setProducts(products);
      addMatchingProducts(products);
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getProductsByCategory(activeFilters[0]);
  }, [activeFilters]);
  
  return (
    <>
        
      </>
    )
  }
