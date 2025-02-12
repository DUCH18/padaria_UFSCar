import { ImageUploader } from "./image-uploader/ImageUploader"
import { CgSpinnerAlt } from "react-icons/cg";
import { Category, ProductResponse } from "../../types/types"
import { FaBoxArchive } from "react-icons/fa6";

type ProductCardProps = {
  product: ProductResponse,
  categories: Category[],
  creating?: boolean,
  editing?: boolean,
  showQuantity?: boolean,
  prevImg?: string;
  onImageChange?: (file: File | null) => void;
  loading?: boolean;
  pageLoad?: boolean;
}

export const ProductCard = ({ product, categories, creating, editing, showQuantity, prevImg, onImageChange, loading, pageLoad }: ProductCardProps) => {
  return (
    <div className='w-[72vw] min-w-[260px] md:max-w-[400px] lg:max-w-[290px] xl:max-w-[400px] h-[210px] bg-gray-300 shadow-custom-01 rounded-md flex relative z-40'>
      <div className='relative w-[50%] sm:w-[40%] flex items-center justify-center bg-orange bg-opacity-80 rounded-l-md overflow-hidden'>
        <div className="flex items-center justify-center">
          {creating ? (
            <ImageUploader onImageChange={onImageChange!} pageLoad={pageLoad} productInitial={product.nome[0]} />
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
      <div className='w-[60%] bg-white p-3 flex flex-col justify-between rounded-r-md'>
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
                <p className='font-bold text-xl line-clamp-2'>{product.nome ? product.nome : "Nome do Produto"}</p>
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
      {showQuantity &&
        <p title="Quantidade em estoque" className="w-fit h-fit flex items-center gap-2 absolute z-20 -top-3 -left-3 font-bold text-lg text-white bg-orange p-2 pl-4 rounded-full">
          <FaBoxArchive /> {product.qtd_em_estoque ? product.qtd_em_estoque : 0}
        </p>
      }
      {/* TODO: adicionar circulo com número para mostar quantidade em estoque próximo ao canto inferior esquerdo da imagem */}
    </div >
  )
}
