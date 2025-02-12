import axios from "axios";
import { ProductResponse, ResponseError } from "../types/types";

/**
 * Método responsável por buscar todos os produtos cadastrados no banco de dados através da API REST (Laravel)
 * @returns retorna um array de objetos contendo todos os produtos cadastrados no banco de dados
 */
export const getAllProducts = async (): Promise<ProductResponse[]> => {
  const response = await axios.get('http://localhost:8000/api/produtos');

  if (response.data.success) return response.data.data;

  const error: ResponseError = new Error("Erro ao buscar produtos");
  error.status = response.status;

  throw error;
}