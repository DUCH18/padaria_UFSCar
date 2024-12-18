import { CgSpinnerAlt } from "react-icons/cg";
import { Category, ProductResponse } from "../../types/types"
import ImageUploader from "./image-uploader/ImageUploader"

type ProductCardProps = {
  product: ProductResponse,
  categories: Category[],
  creating?: boolean,
  editing?: boolean,
  prevImg?: string;
  onImageChange?: (file: File | null) => void; // Callback para manipular mudanças de imagem
  loading?: boolean;
  pageLoad?: boolean;
}

export const ProductCard = ({ product, categories, creating, editing, prevImg, onImageChange, loading, pageLoad }: ProductCardProps) => {
  return (
    <div className='w-[72vw] min-w-[260px] md:max-w-[400px] lg:max-w-[290px] xl:max-w-[400px] h-[210px] bg-gray-300 rounded-md overflow-hidden shadow-custom-01 flex z-40'>
      <div className='relative w-[50%] sm:w-[40%] flex items-center justify-center bg-orange'>
        <div className="flex items-center justify-center">
          {creating ? (
            <ImageUploader onImageChange={onImageChange!} pageLoad={pageLoad}/>
          ) : (
            editing ? (
              <ImageUploader onImageChange={onImageChange!} prevImg={prevImg} />
            ) : (
              loading ? (
                <p className='text-4xl text-brown font-bold'>
                  <CgSpinnerAlt className='animate-spin' />
                </p>
              ) : (
                product.imagem ? (
                  <img
                    src={product.imagem}
                    alt="Imagem meramente ilustrativa do produto"
                    className="object-cover min-h-[210px] z-10"
                  />
                ) : (
                  <p className='text-4xl text-brown font-bold'>{product.nome[0]}</p>
                )
              )
            )
          )}
        </div>
      </div>
      <div className='w-[60%] bg-white p-3 flex flex-col justify-between'>
        {
          loading ? (
            <>
              <div className="flex flex-col gap-3">
                <span className="bg-gray-300 h-[25px] w-[70%] animate-pulse"></span>
                <span className="bg-gray-300 h-[25px] w-[100px] rounded-full animate-pulse"></span>
                <span className="bg-gray-300 h-[25px] w-full animate-pulse"></span>
              </div>
              <span className="bg-gray-300 h-[25px] w-[40%] animate-pulse"></span>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <p className='font-bold text-xl'>{product.nome}</p>
                <p className='flex items-center gap-1 rounded-full bg-orange text-brown bg-opacity-70 w-fit px-2'>
                  {categories.find((category) => category.name === product.categoria)?.icon}
                  {product.categoria}
                </p>
                <p className="break-words line-clamp-2"><i>{product.descricao}</i></p>
              </div>
              <p className='font-bold text-xl'>
                <i>R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 },)}</i>
              </p>
            </>
          )
        }
      </div >
    </div >
  )
}
