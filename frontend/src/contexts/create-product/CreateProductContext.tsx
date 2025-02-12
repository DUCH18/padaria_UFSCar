import { createContext } from 'react';
import { ProductForm } from '../../validation/productSchema';

type CreateProductContextProps = {
  onSubmitRegister: (data: ProductForm) => void;
};

export const CreateProductContext = createContext<CreateProductContextProps>({
  onSubmitRegister: () => { },
});