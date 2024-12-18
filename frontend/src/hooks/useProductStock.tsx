import axios from 'axios';
import { useState, useEffect } from 'react';
import { ProductResponse } from '../types/types';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';

const useProductStock = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categories = [
    {
      name: 'Todos',
      icon: <TiThSmallOutline />,
    },
    {
      name: 'Pães',
      icon: <PiBreadFill />,
    },
    {
      name: 'Doces',
      icon: <RiCake3Line />,
    },
    {
      name: 'Salgados',
      icon: <MdOutlineBakeryDining />,
    },
  ]

  useEffect(() => { // TODO: refactoring (SOLID principles)
    axios.get('http://localhost:8000/api/produtos')
      .then((res) => {
        const response = res.data;

        if (response.success) {
          setProducts(response.data);
        }
      });
  }, []);

  useEffect(() => { // TODO: refactoring (SOLID principles)
    if (selectedCategory === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.categoria === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleSearch = (search: string) => { // TODO: refactoring (SOLID principles)
    if (search === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.nome.toLowerCase().includes(search.toLowerCase())));
    }
  }

  return {
    handleSearch,
    products,
    filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
  }
}

export default useProductStock