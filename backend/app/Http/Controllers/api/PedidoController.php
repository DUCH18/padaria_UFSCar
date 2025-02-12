<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pedido;
use Illuminate\Support\Carbon;
use DB;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'id_cliente' => 'required|exists:clientes,id',
            'id_produto' => 'required|exists:produtos,id',
            'qtd_produto' => 'required|numeric|min:1',
            'data_hora' => 'required|date_format:Y-m-d H:i:s',
        ]);

        try {
            $produto = Produto::findOrFail($validatedData['id_produto']);

            if ($produto->qtd_em_estoque < $validatedData['qtd_produto']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Quantidade de produto em estoque insuficiente.',
                ], 400);
            }

            $pedido = Pedido::create($validatedData);

            $produto->decrement('qtd_em_estoque', $validatedData['qtd_produto']);

            return response()->json([
                'success' => true,
                'pedido' => $pedido,
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao inserir pedido: ' . $e->getMessage(),
            ], 400);
        }
    }

    public function relatorioMensal($id_produto)
    {
        try {
            $meses = collect(range(0, 5))->map(function ($i) {
                return Carbon::now()->subMonths($i)->format('Y-m');
            })->reverse();
        
            $vendas = Pedido::selectRaw('DATE_FORMAT(data_hora, "%Y-%m") as mes, SUM(qtd_produto) as qtd_vendida')
                ->where('id_produto', $id_produto)
                ->where('data_hora', '>=', Carbon::now()->subMonths(5)->startOfMonth())
                ->groupBy('mes')
                ->pluck('qtd_vendida', 'mes');
        
            $relatorio = $meses->map(function ($mes) use ($vendas) {
                return [
                    'mes' => Carbon::createFromFormat('Y-m', $mes)->locale('pt_BR')->translatedFormat('M'),
                    'qtd_vendida' => $vendas->get($mes, 0),
                ];
            })->values();
        
            return response()->json([
                'success' => true,
                'relatorio' => $relatorio
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao gerar relatório: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function getFourBestSellers(Request $request)
    {
        try {
            $validated = $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            $startDate = $validated['start_date'];
            $endDate = $validated['end_date'];

            $bestSellers = DB::table('pedidos')
                ->join('produtos', 'pedidos.id_produto', '=', 'produtos.id')
                ->select('produtos.nome', DB::raw('SUM(pedidos.qtd_produto) as qtd_vendida'))
                ->whereBetween('pedidos.data_hora', [$startDate, $endDate])
                ->groupBy('produtos.nome')
                ->orderByDesc('qtd_vendida')
                ->limit(4)
                ->get();

            $bestSellers = $bestSellers->map(function ($item) {
                return [
                    'name' => $item->nome,
                    'qtd_vendida' => intval($item->qtd_vendida),
                ];
            });

            return response()->json([
                'success' => true,
                'fourBestSellers' => $bestSellers,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar os produtos mais vendidos: ' . $e->getMessage(),
            ], 500);
        }
}
}