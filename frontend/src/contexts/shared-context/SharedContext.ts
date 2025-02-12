import { createContext } from 'react';
import { ProductRequest, ProductResponse } from '../../types/types';

type SharedContextProps = {
  openAlert: boolean;
  setOpenAlert: (value: boolean) => void;
  openConfirm: boolean;
  setOpenConfirm: (value: boolean) => void;
  openError: boolean;
  setOpenError: (value: boolean) => void;
  errorMessage: string;
  setErrorMessage: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;
  productRequest: ProductRequest;
  setProductRequest: (value: ProductRequest) => void;
  productResponse: ProductResponse;
  setProductResponse: (value: ProductResponse) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  pageLoading: boolean;
  setPageLoading: (value: boolean) => void;
}

export const SharedContext = createContext<SharedContextProps>({
  openAlert: false,
  setOpenAlert: () => { },
  openConfirm: false,
  setOpenConfirm: () => { },
  openError: false,
  setOpenError: () => { },
  errorMessage: '',
  setErrorMessage: () => { },

  price: '',
  setPrice: () => { },
  productRequest: { id: 1, nome: '', categoria: '', descricao: '', preco: 0.00, imagem: null, qtd_em_estoque: 0 },
  setProductRequest: () => { },
  productResponse: { id: 1, nome: 'Nome do Produto', categoria: 'Categoria', descricao: 'Sem descrição', preco: 0.00, imagem: undefined, qtd_em_estoque: 0 },
  setProductResponse: () => { },
  handleNameChange: () => { },
  handlePriceChange: () => { },
  handleQuantityChange: () => { },
  handleCategoryChange: () => { },
  handleDescriptionChange: () => { },

  pageLoading: false,
  setPageLoading: () => { },
});