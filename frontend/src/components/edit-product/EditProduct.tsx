import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useProductForm } from '../../hooks/useProductForm';
import { useContext, useEffect, useState } from 'react';
import { CreateProductContext } from '../../contexts/create-product-ctx/CreateProductContext';
import { InputField } from '../inputs/InputField';
import { ProductCard } from '../product-card/ProductCard';
import { TiThSmallOutline } from 'react-icons/ti';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { Button } from '../buttons/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const { register, setValue, handleSubmit, formState: { errors } } = useProductForm();
  const categories = [
    { name: 'Todos', icon: <TiThSmallOutline /> },
    { name: 'Pães', icon: <PiBreadFill /> },
    { name: 'Doces', icon: <RiCake3Line /> },
    { name: 'Salgados', icon: <MdOutlineBakeryDining /> },
  ];
  const {
    pageLoading,
    price,
    setPrice,
    onSubmitUpdate,
    productRequest,
    setProductRequest,
    productResponse,
    setProductResponse,
    handleNameChange,
    handlePriceChange,
    handleCategoryChange,
    handleDescriptionChange,
    handleDeleteProduct,
  } = useContext(CreateProductContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/produtos/${id}`)
      .then((res) => {
        const response = res.data;

        if (response.success) {
          const produto = response.produto;

          setValue("nome", produto.nome);
          setValue("preco", produto.preco);
          setValue("categoria", produto.categoria);
          setValue("descricao", produto.descricao);

          setProductResponse(produto);
          setPrice("R$ " + produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
      });
  }, [id, setPrice, setProductResponse, setValue]);

  useEffect(() => {
    if (productResponse.preco !== 0) {
      setLoading(false);
    }
  }, [productResponse]);

  const onImageChange = (file: File | null) => {
    if (file) {
      setProductRequest({
        ...productRequest,
        imagem: file,
      })
      setValue("imagem", file);
    } else {
      setProductRequest({
        ...productRequest,
        imagem: undefined
      });
      setValue("imagem", null);
    }
  };

  if (pageLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-3xl text-brown font-pacifico flex flex-row gap-2'><CgSpinner className='animate-spin' /> Carregando</h1>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitUpdate)}
      className='bg-vanilla flex flex-col gap-8 justify-center items-center mx-auto'
    >
      <h2 className='text-brown text-center mt-6 font-pacifico w-[60%]'>
        Detalhes do Produto
      </h2>
      <div className='relative w-fit flex flex-col items-center justify-center mx-auto'>
        <span className='block font-pacifico text-xl bg-orange text-white rounded-t-lg px-4 pt-1 pb-2 relative top-1 z-10 w-fit self-start'>
          Prévia
        </span>
        <ProductCard
          product={productResponse}
          categories={categories}
          editing={isEditing}
          prevImg={productResponse.imagem}
          onImageChange={onImageChange}
          loading={loading}
        />
        <span>{errors.imagem && <i>{errors.imagem.message?.toString()}</i>}</span>
      </div>
      <div className='w-full flex flex-col gap-4 px-6'>
        <InputField
          loading={loading}
          label='Nome'
          error={errors.nome}
          input={
            <input
              type="text"
              placeholder='Digite o nome do produto'
              value={productResponse.nome}
              {...register('nome')}
              onChangeCapture={handleNameChange}
              className='outline-none w-full disabled:text-gray-600 disabled:cursor-not-allowed'
              disabled={isEditing ? false : true}
            />
          }
        />
        <InputField
          loading={loading}
          label='Preço'
          error={errors.preco}
          input={
            <input
              type="text"
              value={price}
              placeholder='Digite o preço (apenas números)*'
              onChangeCapture={handlePriceChange}
              {...register('preco')}
              className='outline-none w-full disabled:text-gray-600 disabled:cursor-not-allowed'
              disabled={isEditing ? false : true}
            />
          }
        />
        <InputField
          loading={loading}
          label='Categoria'
          error={errors.categoria}
          input={
            <select
              {...register('categoria')}
              value={productResponse.categoria}
              onChangeCapture={handleCategoryChange}
              className='outline-none w-full cursor-pointer bg-white disabled:text-gray-600 disabled:cursor-not-allowed'
              disabled={isEditing ? false : true}
            >
              <option value="Selecionar">Selecionar</option>
              <option value="Pães">Pães</option>
              <option value="Doces">Doces</option>
              <option value="Salgados">Salgados</option>
            </select>
          }
        />
        <InputField
          loading={loading}
          label='Descrição'
          error={errors.descricao}
          vertical
          input={
            <textarea
              value={productResponse.descricao}
              rows={3}
              placeholder='Digite aqui uma breve descrição sobre o produto (opcional)'
              {...register('descricao')}
              onChangeCapture={handleDescriptionChange}
              className='outline-none w-full resize-none disabled:text-gray-600 disabled:cursor-not-allowed'
              disabled={isEditing ? false : true}
            />
          }
        />
      </div>
      <div className='flex flex-col items-center gap-4 sticky bottom-0 z-40 bg-vanilla border border-black pt-4 rounded-t-[2rem] bg-none w-full'>
        <Button type={
          isEditing
            ? 'button'
            : 'submit'
        }
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Salvar Alterações' : 'Editar Produto'}
        </Button>
        {isEditing && (
          <Button type='button' bgColor='bg-orange' onClick={() => {
            location.reload();
            setIsEditing(false)
          }}>
            Cancelar
          </Button>
        )}
        <Button type='button' bgColor='bg-brown' onClick={handleDeleteProduct}>
          Excluir Produto
        </Button>
        <Link to="/" className='flex items-center gap-2 text-xl mx-auto hover:underline pb-4'>
          <FaArrowLeft />
          Voltar
        </Link>
      </div>
    </form>
  );
}
