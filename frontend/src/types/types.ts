export type Category = {
  name: string;
  icon: React.ReactNode;
}

export type ProductRequest = {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  imagem?: File | null;
  qtd_em_estoque: number;
};

export type ProductResponse = {
  id: number;
  nome: string;
  preco: number | string;
  categoria: string;
  descricao: string;
  imagem?: string | undefined;
  qtd_em_estoque: number;
}

export type ProductChartData = {
  qtd_vendida: number;
  mes?: string;
  name?: string;
}

export type ProductChartProps = {
  productChartData: ProductChartData[];
}

export type DateRangeObject = {
  startDate: Date;
  endDate: Date;
  key: string;
}

export interface ResponseError extends Error {
  status?: number;
}