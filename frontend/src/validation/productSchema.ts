import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];

export const productSchema = z.object({
  nome: z
    .string()
    .min(1, 'O nome do produto deve ser informado'),
  preco: z
    .union(
      [
        z
          .number(),
        z
          .string()
          .max(9, 'O preço deve ser abaixo de R$ 1000,00')
          .transform((val: string) => parseFloat(val.slice(3).replace(',', '.')))
          .refine((val: number) => val > 0, 'O preço do produto deve ser maior que zero'),
      ]
    ),
  categoria: z
    .enum(
      ['Pães', 'Doces', 'Salgados'], 
      { errorMap: () => (
        { message: 'Por favor, selecione uma categoria' }
      )}
    ),
  descricao: z
    .string()
    .optional()
    .nullable(),
  imagem: z
    .instanceof(File)
    .refine(
      (file: File) => file?.size <= MAX_FILE_SIZE, 
      'O tamanho da imagem deve ser de até 5MB'
    )
    .refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Apenas formatos .jpg, .jpeg, .png, .webp e .svg são aceitos'
    )
    .optional()
    .nullable(),
});

export type ProductForm = z.infer<typeof productSchema>;