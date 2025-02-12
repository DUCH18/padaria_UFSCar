import { ReactNode, useState } from 'react';
import { SharedContext } from './SharedContext';
import { useWarnings } from '../../hooks/useWarnings';
import { useProductData } from '../../hooks/useProductData';

export const SharedContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    openAlert,
    setOpenAlert,
    openConfirm,
    setOpenConfirm,
    openError,
    setOpenError,
    errorMessage,
    setErrorMessage,
  } = useWarnings();
  const {
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
  } = useProductData();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  return (
    <SharedContext.Provider value={{
      openAlert,
      setOpenAlert,
      openConfirm,
      setOpenConfirm,
      openError,
      setOpenError,
      errorMessage,
      setErrorMessage,

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

      pageLoading,
      setPageLoading,
    }}>
      {children}
    </SharedContext.Provider>
  );
}