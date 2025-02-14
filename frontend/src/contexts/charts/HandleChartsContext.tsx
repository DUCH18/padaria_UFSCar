import { createContext } from 'react';
import { DateRangeObject, ProductChartData, ProductResponse } from '../../types/types';

type HandleChartsContextProps = {
  loadingSearchDropdown: boolean;
  openSearchDropdown: boolean;
  setOpenSearchDropdown: (value: boolean) => void;
  loadingChartData: boolean;
  setLoadingChartData: (value: boolean) => void;
  productsFound: ProductResponse[];
  selectedProductName: string;
  setSelectedProductName: (value: string) => void;
  handleCreateLineChart: (search: string) => void;
  selectedProductData: ProductChartData[] | null;
  setselectedProductData: (value: ProductChartData[] | null) => void;
  dateRange: DateRangeObject[];
  handleRangeChange: (item) => void;
  handleCreatePieChart: () => void;
  openDateRange: boolean;
  setOpenDateRange: (value: boolean) => void;
  fourBestSellers: ProductChartData[] | null;
  selectedProductId: number | null;
  setSelectedProductId: (value: number) => void;
};

export const HandleChartsContext = createContext<HandleChartsContextProps>({
  loadingSearchDropdown: false,
  openSearchDropdown: false,
  setOpenSearchDropdown: () => { },
  loadingChartData: false,
  setLoadingChartData: () => { },
  productsFound: [],
  selectedProductName: '',
  setSelectedProductName: () => { },
  handleCreateLineChart: () => { },
  selectedProductData: null,
  setselectedProductData: () => { },
  dateRange: [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }],
  handleRangeChange: () => { },
  handleCreatePieChart: () => { },
  openDateRange: false,
  setOpenDateRange: () => { },
  fourBestSellers: null,
  selectedProductId: null,
  setSelectedProductId: () => { }
});