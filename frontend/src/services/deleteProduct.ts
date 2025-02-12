import axios from "axios";
import { ResponseError } from "../types/types";

/**
 * Método responsável por excluir um produto do banco de dados através da API REST (Laravel)
 * @param id id do produto a ser excluído
 * @returns retorna o controle para a função chamadora em caso de sucesso ou lança um erro em caso de falha
 */
export const deleteProduct = async (id: string | undefined) => {
  const response = await axios.delete(`http://localhost:8000/api/produtos/${id}`);

  if (response.data.success) return;

  const error: ResponseError = new Error("Erro ao excluir produto");
  error.status = response.status;

  throw error;
}
