import { ReactNode, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { EditProductContext } from "./EditProductContext";
import { SharedContext } from "../shared-context/SharedContext";
import { updateProduct } from "../../services/updateProduct";
import { deleteProduct } from "../../services/deleteProduct";
import { ResponseError } from "../../types/types";
import { ProductForm } from "../../validation/productSchema";

export const EditProductProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams<{ id: string }>();
  const {
    setPageLoading,
    setOpenAlert,
    setOpenError,
    setErrorMessage,
  } = useContext(SharedContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onSubmitUpdate = async (data: ProductForm) => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setPageLoading(true);

    const formData = new FormData();

    formData.append('nome', data.nome);
    formData.append('categoria', data.categoria);
    formData.append('descricao', data.descricao || '');
    formData.append('preco', data.preco.toString());
    formData.append('qtd_em_estoque', data.qtd_em_estoque.toString());

    if (data.imagem instanceof File) {
      formData.append('imagem', data.imagem);
    }

    try {
      await updateProduct(id, formData);

      setIsEditing(false);

      setTimeout(() => {
        setOpenAlert(true);
      }, 1000);

    } catch (error: unknown) {

      setTimeout(() => {
        setOpenError(true);
      }, 1000);

      // setIsEditing(false);

      if ((error as ResponseError).status === 409) {
        setErrorMessage("Já existe um produto cadastrado com este nome");
      } else {
        setErrorMessage("Ocorreu um erro ao editar o produto. Verifique o console do navegador.");
        console.error("[POST] Erro ao editar o produto:", error);
      }
    }
  };

  const handleDeleteProduct = async () => {
    setPageLoading(true);

    try {
      await deleteProduct(id);

      setTimeout(() => {
        setPageLoading(false);
      }, 1000);

    } catch (error: unknown) {

      setTimeout(() => {
        setOpenError(true);
      }, 1000);

      setErrorMessage("Ocorreu um erro ao excluir o produto. Verifique o console do navegador.");
      console.error("[DELETE] Erro ao excluir o produto:", error);
    }
  };

  return (
    <EditProductContext.Provider value={{ isEditing, setIsEditing, onSubmitUpdate, handleDeleteProduct }}>
      {children}
    </EditProductContext.Provider>
  );
}