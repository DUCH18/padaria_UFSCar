import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../buttons/Button';
import { Warning } from '../warning/Warning';
import { InputField } from '../inputs/InputField';
import { ProductCard } from '../product-card/ProductCard';
import { PiBreadFill } from 'react-icons/pi';
import { RiCake3Line } from 'react-icons/ri';
import { TiThSmallOutline } from 'react-icons/ti';
import { MdOutlineBakeryDining } from 'react-icons/md';
import { FaArrowLeft, FaRegCheckCircle } from 'react-icons/fa';

import { useProductForm } from '../../hooks/useProductForm';
import { SharedContext } from '../../contexts/shared-context/SharedContext';
import { CreateProductContext } from '../../contexts/create-product/CreateProductContext';

export const CreateProduct = () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useProductForm();
  const navigate = useNavigate();
  const {
    openAlert,
    setOpenAlert,
    openConfirm,
    setOpenConfirm,
    openError,
    setOpenError,
    errorMessage,

    price,
    productRequest,
    setProductRequest,
    productResponse,
    handleNameChange,
    handlePriceChange,
    handleQuantityChange,
    handleCategoryChange,
    handleDescriptionChange,

    pageLoading,
    setPageLoading,
  } = useContext(SharedContext);
  const {
    onSubmitRegister,
  } = useContext(CreateProductContext);

  const categories = [
    { name: 'Todos', icon: <TiThSmallOutline /> },
    { name: 'Pães', icon: <PiBreadFill /> },
    { name: 'Doces', icon: <RiCake3Line /> },
    { name: 'Salgados', icon: <MdOutlineBakeryDining /> },
  ];

  const [dots, setDots] = useState(""); // Estado para os pontos

  useEffect(() => {
    if (!pageLoading) return;
    if (openAlert || openError) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 200);

    return () => clearInterval(interval);
  }, [openAlert, openError, pageLoading]);

  const onImageChange = (file: File | null) => {
    if (file) {
      setProductRequest({ ...productRequest, imagem: file });
      setValue("imagem", file);
    } else {
      setProductRequest({ ...productRequest, imagem: undefined });
      setValue("imagem", null);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitRegister)}
        className='bg-vanilla lg:h-screen flex flex-col lg:flex-row gap-8 lg:gap-0 justify-center items-center'
      >
        {!pageLoading && (
          <div className='flex flex-col items-center gap-6 md:w-[50%] px-6 lg:px-16'>
            <h2 className='text-brown text-center mt-6 lg:mt-8 font-pacifico'>
              Cadastrar Produto
            </h2>
            <div className='w-full flex flex-col gap-4'>
              <InputField
                label='Nome'
                error={errors.nome}
                input={
                  <input
                    type="text"
                    placeholder='Digite o nome do produto'
                    {...register('nome')}
                    onChangeCapture={handleNameChange}
                    className='outline-none w-full'
                  />
                }
              />
              <InputField
                label='Preço'
                error={errors.preco}
                input={
                  <input
                    type="text"
                    value={price}
                    placeholder='Digite o preço (apenas números)*'
                    onChangeCapture={handlePriceChange}
                    {...register('preco')}
                    className='outline-none w-full '
                  />
                }
              />
              <InputField
                label='Estoque'
                error={errors.qtd_em_estoque}
                input={
                  <input
                    type="number"
                    placeholder='Digite a quantidade em estoque'
                    onChangeCapture={handleQuantityChange}
                    {...register('qtd_em_estoque')}
                    className='outline-none w-full'
                    defaultValue={0}
                    min={0}
                  />
                }
              />
              <InputField
                label='Categoria'
                error={errors.categoria}
                input={
                  <select
                    {...register('categoria')}
                    onChangeCapture={handleCategoryChange}
                    className='outline-none w-full cursor-pointer bg-white'
                  >
                    <option value="Selecionar">Selecionar</option>
                    <option value="Pães">Pães</option>
                    <option value="Doces">Doces</option>
                    <option value="Salgados">Salgados</option>
                  </select>
                }
              />
              <InputField
                label='Descrição'
                error={errors.descricao}
                vertical
                input={
                  <textarea
                    rows={3}
                    placeholder='Digite aqui uma breve descrição sobre o produto (opcional)'
                    {...register('descricao')}
                    onChangeCapture={handleDescriptionChange}
                    className='outline-none w-full resize-none'
                  />
                }
              />
            </div>
            <div className='hidden lg:flex flex-col items-center gap-4'>
              <Button type='submit'>
                Cadastrar
              </Button>
              <button type='button' onClick={() => setOpenConfirm(true)} className='flex items-center gap-2 text-xl mx-auto hover:underline pb-4'>
                <FaArrowLeft />
                Voltar
              </button>
            </div>
          </div>
        )}
        <div className={`${!pageLoading ? "w-fit lg:w-[50%] lg:h-screen lg:bg-orange lg:bg-opacity-90" : "w-full lg:w-full bg-orange h-screen gap-8"} relative flex flex-col items-center justify-center lg:mx-auto`}>
          <span className={`${!pageLoading ? "hidden lg:block" : ""} text-5xl font-pacifico text-white mb-3`}>
            Prévia
          </span>
          <span className={`${!pageLoading ? "" : "hidden lg:block"}  lg:hidden block font-pacifico text-2xl bg-orange text-white rounded-t-lg px-4 pt-1 pb-2 relative top-1 right-0 left-0 mr-auto ml-auto z-10 w-fit self-start`}>
            Prévia
          </span>
          <ProductCard
            product={productResponse}
            categories={categories}
            creating
            showQuantity
            onImageChange={onImageChange}
            pageLoad={pageLoading}
          />
          <span>{errors.imagem && <i>{errors.imagem.message?.toString()}</i>}</span>
          {pageLoading && (
            <>
              <div className='text-brown text-center flex flex-col gap-2 px-2'>
                <span className='font-pacifico text-2xl'>
                  Finalizando cadastro de produto {dots}
                </span>
                <span>
                  Aguarde e em alguns instantes você será automaticamente
                  redirecionado(a) para uma nova página =)
                </span>
              </div>
              {openAlert && (
                <Warning
                  open
                  type='alert'
                  warningMessage="Produto cadastrado com sucesso! Você será redirecionado para a página inicial."
                  denyButtonMessage="Ok, prosseguir"
                  onDenyClose={() => {
                    setOpenAlert(false);
                    setPageLoading(false);
                    navigate('/');
                  }}
                  icon={<FaRegCheckCircle />}
                />
              )}
              {openError && (
                <Warning
                  open
                  type='alert'
                  warningMessage={errorMessage}
                  denyButtonMessage='Voltar'
                  onDenyClose={() => {
                    setOpenError(false);
                    setPageLoading(false);
                  }}
                />
              )}
            </>
          )}
        </div>
        {!pageLoading && (
          <div className='flex lg:hidden flex-col items-center gap-4 sticky bottom-0 md:static z-50 bg-vanilla border border-black w-full pt-4 rounded-t-3xl md:bg-none md:border-none md:pt-0'>
            <Button type='submit'>
              Cadastrar
            </Button>
            <button type='button' onClick={() => setOpenConfirm(true)} className='flex items-center gap-2 text-xl mx-auto pb-4 hover:underline focus:outline-none'>
              <FaArrowLeft /> Voltar
            </button>
          </div>
        )}
      </form >
      {<Warning
        open={openConfirm}
        type='confirm'
        warningMessage="Por favor, confirme se você deseja cancelar o cadastro do produto."
        confirmButtonMessage="Sim, cancelar cadastro de produto"
        denyButtonMessage="Não, continuar cadastro"
        onDenyClose={() => setOpenConfirm(false)}
        onConfirmClose={() => navigate('/')}
      />}
    </>
  );
}