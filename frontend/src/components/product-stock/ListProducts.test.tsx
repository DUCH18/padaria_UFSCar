// TODO: atualizar testes unitários para ProductStock.tsx
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { handlers } from "../../mocks/handlers";
import ListProducts from "./ProductStock";

it("Deve exibir a lista de produtos", async () => {
  render(
    <BrowserRouter>
      <ListProducts />
    </BrowserRouter>

  );

  expect(screen.getByText("Lista de Produtos")).toBeInTheDocument();

  const link = screen.getByRole('link', { name: "Cadastrar Novo Produto" });
  expect(link).toBeInTheDocument();
})

const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("Deve puxar os produtos da API e listá-los na tela", async () => {
  render(
    <BrowserRouter>
      <ListProducts />
    </BrowserRouter>
  );

  expect(await screen.findByText("Pão de Sal")).toBeInTheDocument();
  expect(await screen.findByText("Brigadeiro")).toBeInTheDocument();
})