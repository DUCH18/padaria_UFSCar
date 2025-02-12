import { useState, useEffect } from 'react';
import { ProductResponse } from '../types/types';
import { getAllProducts } from '../services/getAllProducts';
import { CATEGORIES } from '../constants/categories';

/**
 * Custom hook
 * @returns retorna um conjunto de métodos e estados úteis para listar e filtrar produtos
 */
const useProductStock = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    (
      async () => {
        const products = await getAllProducts();
        setProducts(products);
        setLoading(false);
      }
    )();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.categoria === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleSearch = (search: string) => {
    if (search) {
      setFilteredProducts(products.filter((product) => product.nome.toLowerCase().includes(search.toLowerCase())));
    } else {
      setFilteredProducts(products);
    }
  }

  return {
    loading,
    handleSearch,
    categories: CATEGORIES,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  }
}

export default useProductStock