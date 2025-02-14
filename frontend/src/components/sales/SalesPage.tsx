import { useContext, useState } from "react";
import { ProductLineChartSearchInput } from "../charts/ProductLineChartSearchInput"
import { InputField } from "../inputs/InputField"
import { HandleChartsContext } from "../../contexts/charts/HandleChartsContext";
import { Button } from "../buttons/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { SharedContext } from "../../contexts/shared-context/SharedContext";
import { Warning } from "../warning/Warning";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { postOrder } from "../../services/postOrder";

export const SalesPage = () => {
  const navigate = useNavigate();
  const { selectedProductName, selectedProductId } = useContext(HandleChartsContext);
  const {
    openAlert,
    setOpenAlert,
    openConfirm,
    setOpenConfirm,
    openError,
    setOpenError,
    errorMessage,
    setErrorMessage
  } = useContext(SharedContext);

  const [quantity, setQuantity] = useState(0);
  const [payment, setPayment] = useState("Selecionar");

  const handleSubmitSale = async (e) => {
    e.preventDefault();

    if (!selectedProductId || quantity <= 0 || payment === "Selecionar") {
      setErrorMessage("Por favor, preencha todos os campos corretamente.");
      setOpenError(true);
      return;
    }

    const saleData = {
      id_produto: selectedProductId,
      qtd_produto: quantity,
      data_hora: new Date().toISOString().slice(0, 19).replace("T", " "),
      pagamento: payment,
    };

    // console.log(saleData);

    try {
      await postOrder(saleData);

      setTimeout(() => {
        setOpenAlert(true);
      }, 2000);
    } catch (error) {
      setErrorMessage("Erro ao conectar com o servidor.");
      setOpenError(true);
      console.error("Erro ao realizar a venda:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitSale} className='flex flex-col items-center mx-auto gap-6 max-w-[600px] px-6 lg:px-16'>
        <h2 className='text-brown text-center mt-6 lg:mt-8 font-pacifico'>
          Vender Produto
        </h2>
        <div className='w-full flex flex-col gap-4'>
          <ProductLineChartSearchInput isSale caption='Pesquise pelo nome e selecione um determinado produto para realizar a venda' />
          {/* <p className="font-bold text-lg">Produto Selecionado: <span className="text-orange">{selectedProductName}</span></p> */}
          <InputField
            label='Produto selecionado'
            input={
              <input
                type="text"
                name="name"
                placeholder='Pesquise e selecione um produto'
                className='outline-none w-full'
                value={selectedProductName}
                min={0}
                disabled
              />
            }
          />
          <InputField
            label='Quantidade'
            input={
              <input
                type="number"
                name="quantity"
                placeholder='Quantidade'
                className='outline-none w-full'
                defaultValue={0}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={0}
              />
            }
          />
          <InputField
            label='Forma de Pagamento'
            input={
              <select
                name="payment"
                onChange={(e) => setPayment(e.target.value)}
                className='outline-none w-full cursor-pointer bg-white'
              >
                <option value="Selecionar">Selecionar</option>
                <option value="Pix">Pix</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
              </select>
            }
          />
        </div>
        <div className='flex flex-col items-center gap-4'>
          <Button type='submit'>
            Vender
          </Button>
          <button type='button' onClick={() => setOpenConfirm(true)} className='flex items-center gap-2 text-xl mx-auto hover:underline pb-4'>
            <FaArrowLeft />
            Voltar
          </button>
        </div>
      </form>
      {openAlert && (
        <Warning
          open
          type='alert'
          warningMessage="Venda realizada com sucesso! Você será redirecionado para a página inicial."
          denyButtonMessage="Ok, prosseguir"
          onDenyClose={() => {
            setOpenAlert(false);
            // setPageLoading(false);
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
            // setPageLoading(false);
          }}
        />
      )}
      {<Warning
        open={openConfirm}
        type='confirm'
        warningMessage="Por favor, confirme se você deseja cancelar a venda do produto."
        confirmButtonMessage="Sim, cancelar venda de produto"
        denyButtonMessage="Não, continuar venda"
        onDenyClose={() => setOpenConfirm(false)}
        onConfirmClose={() => navigate('/')}
      />}
    </>
  )
}
