import { ReactNode, useEffect, useState } from "react";
import { HandleChartsContext } from "./HandleChartsContext";
import { getFourBestSellers } from "../../services/getFourBestSellers";
import { ProductChartData, ProductResponse } from "../../types/types";
import { addDays } from "date-fns";
import { getAllProducts } from "../../services/getAllProducts";

export const HandleChartsProvider = ({ children }: { children: ReactNode }) => {
  // Line Chart:
  const [loadingSearchDropdown, setLoadingSearchDropdown] = useState<boolean>(false);
  const [openSearchDropdown, setOpenSearchDropdown] = useState<boolean>(false);
  const [loadingChartData, setLoadingChartData] = useState<boolean>(false);
  const [productsFound, setProductsFound] = useState<ProductResponse[]>([]);
  const [selectedProductName, setSelectedProductName] = useState<string>('');
  const [selectedProductData, setselectedProductData] = useState<ProductChartData[] | null>([
    { qtd_vendida: 0, mes: 'Jul' },
    { qtd_vendida: 0, mes: 'Ago' },
    { qtd_vendida: 0, mes: 'Set' },
    { qtd_vendida: 0, mes: 'Out' },
    { qtd_vendida: 0, mes: 'Nov' },
    { qtd_vendida: 0, mes: 'Dez' },
  ]);

  const handleCreateLineChart = async (search: string) => {
    if (search.length < 3) {
      setOpenSearchDropdown(false);

      setProductsFound([]);

      setSelectedProductName('');

      setselectedProductData([
        { qtd_vendida: 0, mes: 'Jul' },
        { qtd_vendida: 0, mes: 'Ago' },
        { qtd_vendida: 0, mes: 'Set' },
        { qtd_vendida: 0, mes: 'Out' },
        { qtd_vendida: 0, mes: 'Nov' },
        { qtd_vendida: 0, mes: 'Dez' },
      ]);

      return;
    }

    setLoadingSearchDropdown(true);

    setOpenSearchDropdown(true);

    const products = await getAllProducts();

    setProductsFound(products.filter((product) => product.nome.toLowerCase().includes(search.toLowerCase())));

    setLoadingSearchDropdown(false);
  }

  // Pie Chart:
  const [openDateRange, setOpenDateRange] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState([{
    startDate: addDays(new Date(), -6),
    endDate: new Date(),
    key: 'selection'
  }]);
  const [fourBestSellers, setFourBestSellers] = useState<ProductChartData[] | null>([
    { name: 'Pão Francês (unidade)', qtd_vendida: 450 },
    { name: 'Bolo de Chocolate', qtd_vendida: 300 },
    { name: 'Fatia de Torta de Morango', qtd_vendida: 250 },
    { name: 'Croissant', qtd_vendida: 150 },
  ]);

  useEffect(() => {
    (
      async () => {
        const fourBestSellers: ProductChartData[] = await getFourBestSellers(dateRange[0].startDate, dateRange[0].endDate);

        setFourBestSellers(fourBestSellers)
      }
    )();
  }, []);

  const handleRangeChange = (item) => {
    setDateRange([item.selection]);
  }

  const handleCreatePieChart = async () => {
    setOpenDateRange(false);

    try {
      const fourBestSellers: ProductChartData[] = await getFourBestSellers(dateRange[0].startDate, dateRange[0].endDate);

      setFourBestSellers(fourBestSellers);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <HandleChartsContext.Provider
      value={{
        loadingSearchDropdown,
        openSearchDropdown,
        setOpenSearchDropdown,
        loadingChartData,
        setLoadingChartData,
        productsFound,
        selectedProductName,
        setSelectedProductName,
        handleCreateLineChart,
        selectedProductData,
        setselectedProductData,
        dateRange,
        handleRangeChange,
        handleCreatePieChart,
        openDateRange,
        setOpenDateRange,
        fourBestSellers
      }}
    >
      {children}
    </HandleChartsContext.Provider>
  );
}