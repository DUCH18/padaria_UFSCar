import axios from "axios";
import { ProductChartData, ResponseError } from "../types/types";

/**
 * Método responsável por buscar um relatório das vendas de um produto nos últimos 6 meses no banco de dados através da API REST (Laravel)
 * @param id id do produto referente
 * @returns retorna um promise/array contendo as informações de quantidade de produto vendida em determinado mês para cada mês no período de 6 meses
 */
export const getProductSalesData = async (id: number): Promise<ProductChartData[]> => {
  const response = await axios.get(`http://localhost:8000/api/relatorio/${id}`);

  if (response.data.success) return response.data.relatorio;

  const error: ResponseError = new Error("Erro ao buscar produto");
  error.status = response.status;

  throw error;
}
