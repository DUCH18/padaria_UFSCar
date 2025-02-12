import axios from "axios";
import { ResponseError } from "../types/types";

/**
 * Método responsável por editar um produto no banco de dados através da API REST (Laravel)
 * @param id id do produto a ser editado
 * @param formData set contendo os dados do produto a ser editado
 * @returns retorna o controle para a função chamadora em caso de sucesso ou lança um erro em caso de falha
 */
export const updateProduct = async (id: string | undefined, formData: FormData) => {
  formData.append('_method', 'PUT')

  const response = await axios.post(`http://localhost:8000/api/produtos/${id}`, formData);

  if (response.data.success) return;

  const error: ResponseError = new Error("Erro ao editar produto");
  error.status = response.status;

  throw error;
}
