import axios from "axios";
import { ProductResponse, ResponseError } from "../types/types";

/**
 * Método responsável por buscar um produto no banco de dados através da API REST (Laravel)
 * @param id id do produto a ser buscado
 * @returns retorna um objeto contendo as informações do produto buscado em caso de sucesso ou lança um erro em caso de falha
 */
export const getProductById = async (id: string | undefined): Promise<ProductResponse> => {
  const response = await axios.get(`http://localhost:8000/api/produtos/${id}`);

  if (response.data.success) return response.data.produto;

  const error: ResponseError = new Error("Erro ao buscar produto");
  error.status = response.status;

  throw error;
}
