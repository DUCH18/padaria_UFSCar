import { useForm } from "react-hook-form"
import { ProductForm, productSchema } from "../validation/productSchema"
import { zodResolver } from "@hookform/resolvers/zod"

export const useProductForm = () => {
  return useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });
}