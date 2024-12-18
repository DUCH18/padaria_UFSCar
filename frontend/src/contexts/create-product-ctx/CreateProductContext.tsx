import { createContext } from 'react';
import { ProductRequest, ProductResponse } from '../../types/types';
import { ProductForm } from '../../validation/productSchema';

type CreateProductContextProps = {
  pageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
  price: string;
  setPrice: (price: string) => void;
  productRequest: ProductRequest,
  setProductRequest: (product: ProductRequest) => void,
  productResponse: ProductResponse;
  setProductResponse: (product: ProductResponse) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitRegister: (data: ProductForm) => void;
  onSubmitUpdate: (data: ProductForm) => void;
  handleDeleteProduct: () => void;
};

export const CreateProductContext = createContext<CreateProductContextProps>({
  pageLoading: false,
  setPageLoading: () => { },
  price: '0,00',
  setPrice: () => { },
  productRequest: {
    id: 1,
    nome: '',
    preco: 0.00,
    categoria: '',
    descricao: '',
    imagem: null,
  },
  setProductRequest: () => { },
  productResponse: {
    id: 1,
    nome: 'Nome do Produto',
    preco: 0.00,
    categoria: 'Categoria',
    descricao: 'Descrição',
    imagem: undefined,
  },
  setProductResponse: () => { },
  handleNameChange: () => { },
  handlePriceChange: () => { },
  handleCategoryChange: () => { },
  handleDescriptionChange: () => { },
  onSubmitRegister: () => { },
  onSubmitUpdate: () => { },
  handleDeleteProduct: () => { },
});