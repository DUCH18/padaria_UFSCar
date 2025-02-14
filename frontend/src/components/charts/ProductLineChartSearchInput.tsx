import { CATEGORIES as categories } from '../../constants/categories';
import { SearchInput } from "../inputs/SearchInput";
import { ProductChartData } from "../../types/types";
import { getProductSalesData } from "../../services/getProductSalesData";
import { useContext } from "react";
import { HandleChartsContext } from "../../contexts/charts/HandleChartsContext";

export const ProductLineChartSearchInput = ({ isSale, caption }: { isSale?: boolean, caption: string }) => {
  const {
    loadingSearchDropdown,
    openSearchDropdown,
    setOpenSearchDropdown,
    loadingChartData,
    setLoadingChartData,
    productsFound,
    setSelectedProductName,
    handleCreateLineChart,
    setselectedProductData,
    setSelectedProductId,
  } = useContext(HandleChartsContext);

  return (
    <div className="relative max-w-[700px] mb-8 mx-auto flex flex-col gap-4">
      <SearchInput handleSearch={handleCreateLineChart} />
      {openSearchDropdown && (
        <div className={`absolute z-10 top-10 w-fit pt-6 pb-4 shadow-custom-01 shadow-gray-300 rounded-b-xl ${loadingChartData ? "pointer-events-none bg-gray-100" : "bg-white"}`}>
          {loadingSearchDropdown ? (
            <ul>
              <li className="py-2 px-8">
                Carregando...
              </li>
            </ul>
          ) : (
            <ul className='flex flex-col'>
              {productsFound.map((product) => (
                <li
                  key={product.id}
                  onClick={async () => {
                    if (isSale) {
                      setSelectedProductName(product.nome);
                      setSelectedProductId(product.id);
                      setOpenSearchDropdown(false);
                      setLoadingChartData(false);
                      return;
                    }

                    setLoadingChartData(true);

                    try {
                      const productSalesData: ProductChartData[] = await getProductSalesData(product.id);

                      setselectedProductData(productSalesData);
                      setSelectedProductName(product.nome);
                      setOpenSearchDropdown(false);
                      setLoadingChartData(false);
                    } catch (error) {
                      setLoadingChartData(false);
                      alert('Erro ao buscar dados de vendas do produto');
                      console.log(error);
                    }
                  }}
                  className={`flex items-center gap-2 py-2 px-8 text-lg ${loadingChartData ? "text-gray-400" : "cursor-pointer text-brown hover:bg-gray-100 hover:text-orange"}`}
                >
                  {categories.find((category) => category.name === product.categoria)?.icon}
                  {product.nome}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <p className="text-gray-400 font-bold">{caption}</p>
    </div>
  )
}
