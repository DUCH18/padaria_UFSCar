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
};

export type ProductResponse = {
  id: number;
  nome: string;
  preco: number | string;
  categoria: string;
  descricao: string;
  imagem?: string | undefined;
}