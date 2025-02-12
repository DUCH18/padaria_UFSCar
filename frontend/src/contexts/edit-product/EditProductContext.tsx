import { createContext } from 'react';
import { ProductForm } from '../../validation/productSchema';

type EditProductContextProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onSubmitUpdate: (data: ProductForm) => void;
  handleDeleteProduct: () => void;
};

export const EditProductContext = createContext<EditProductContextProps>({
  isEditing: false,
  setIsEditing: () => { },
  onSubmitUpdate: () => { },
  handleDeleteProduct: () => { },
});