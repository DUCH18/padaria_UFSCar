// validations
import { ProductForm, productSchema } from "../validation/productSchema"

// dependencies
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

/**
 * Custom hook
 * @returns retorna os métodos para gerenciar estados de formulário da biblioteca react-hook-form utilizando um esquema de validação da biblioteca zod
 */
export const useProductForm = () => {
  return useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });
}