import { ReactNode, useContext } from "react";
import { SharedContext } from "../shared-context/SharedContext";
import { CreateProductContext } from "./CreateProductContext";
import { postProduct } from "../../services/postProduct";
import { ProductForm } from "../../validation/productSchema";
import { ResponseError } from "../../types/types";

export const CreateProductProvider = ({ children }: { children: ReactNode }) => {
  const {
    setPageLoading,
    setOpenAlert,
    setOpenError,
    setErrorMessage,
  } = useContext(SharedContext);

  const onSubmitRegister = async (data: ProductForm) => {
    setPageLoading(true);

    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("categoria", data.categoria);
    formData.append("descricao", data.descricao || "");
    formData.append("preco", data.preco.toString());
    formData.append("qtd_em_estoque", data.qtd_em_estoque.toString());

    if (data.imagem instanceof File) {
      formData.append("imagem", data.imagem);
    }

    try {
      await postProduct(formData);

      setTimeout(() => {
        setOpenAlert(true);
      }, 2000);
      
    } catch (error: ResponseError | unknown) {
      setTimeout(() => {
        setOpenError(true);
      }, 2000);

      if ((error as ResponseError).status === 409) {
        setErrorMessage("Já existe um produto cadastrado com este nome");
      } else {
        setErrorMessage("Ocorreu um erro ao cadastrar o produto. Verifique o console do navegador.");
        console.error("[CADASTRO] Erro ao cadastrar produto:", error);
      }
    }
  };

  return (
    <CreateProductContext.Provider value={{ onSubmitRegister }}>
      {children}
    </CreateProductContext.Provider>
  );
}