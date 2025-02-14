import axios from "axios";
import { ResponseError } from "../types/types";

/**
 * Método responsável por cadastrar um produto no banco de dados através da API REST (Laravel)
 * @param formData set contendo os dados do produto a ser cadastrado
 * @returns retorna o controle para a função chamadora em caso de sucesso ou lança um erro em caso de falha
 */
export const postOrder = async (saleData) => {
  const response = await axios.post(
    "http://localhost:8000/api/vendas",
    saleData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  if (response.data.success) return response.data.success;

  const error: ResponseError = new Error("Erro ao editar produto");
  error.status = response.status;

  throw error;
}
