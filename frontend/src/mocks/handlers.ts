import { http, HttpResponse } from "msw";

export const handlers = [
  http.get('http://localhost:8000/api/produtos', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: 1, nome: 'Pão de Sal', categoria: 'Pães', descricao: 'Pão francês recém tirado do forno', preco: 0.5 },
        { id: 2, nome: 'Brigadeiro', categoria: 'Doces', descricao: 'Bolinha de chocolate com chocolate granulado', preco: 1.5 },
      ]
    });
  }),
]