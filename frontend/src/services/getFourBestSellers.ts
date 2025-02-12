import axios from "axios";
import { ResponseError } from "../types/types";

export const getFourBestSellers = async (startDate: Date, endDate: Date) => {
  const response = await axios.get(`http://localhost:8000/api/best-sellers`, {
    params: {
      // Formata datas para YYYY-MM-DD
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
    },
  });

  if (response.data.success) return response.data.fourBestSellers;

  const error: ResponseError = new Error("Erro ao buscar os produtos mais vendidos");
  error.status = response.status;

  throw error;
};
