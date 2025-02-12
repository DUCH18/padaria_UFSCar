import { useState } from "react";
import { ProductRequest, ProductResponse } from "../types/types";

/**
 * Custom hook
 * @returns retorna um conjunto de métodos e estados úteis para cadastrar e/ou editar um produto
 */
export const useProductData = () => {
  const [price, setPrice] = useState<string>('R$ 0,00');
  const [productRequest, setProductRequest] = useState<ProductRequest>({
    id: 1,
    nome: '',
    categoria: '',
    descricao: '',
    preco: 0.00,
    qtd_em_estoque: 0,
    imagem: null,
  });
  const [productResponse, setProductResponse] = useState<ProductResponse>({
    id: 1,
    nome: 'Nome do Produto',
    categoria: 'Categoria',
    descricao: 'Sem descrição',
    preco: 0.00,
    qtd_em_estoque: 0,
    imagem: undefined,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;

    if (name === '') {
      setProductResponse({ ...productResponse, nome: '' });
      return;
    }

    setProductResponse({ ...productResponse, nome: name });
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, '');

    if (!input) {
      setPrice('R$ 0,00');
      return;
    }

    const numericValue = Math.min(Number(input), 99999);

    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setPrice("R$ " + formattedValue);
    setProductResponse({ ...productResponse, preco: numericValue / 100 });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(event.target.value);

    setProductResponse({ ...productResponse, qtd_em_estoque: quantity });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;

    if (category === 'Selecionar') {
      setProductResponse({ ...productResponse, categoria: 'Categoria' });
      return;
    }

    setProductResponse({ ...productResponse, categoria: category });
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;

    if (description === '') {
      setProductResponse({ ...productResponse, descricao: 'Descrição' });
      return;
    }

    setProductResponse({ ...productResponse, descricao: description });
  }

  return {
    price,
    setPrice,
    productRequest,
    setProductRequest,
    productResponse,
    setProductResponse,
    handleNameChange,
    handlePriceChange,
    handleQuantityChange,
    handleCategoryChange,
    handleDescriptionChange,
  }
}
