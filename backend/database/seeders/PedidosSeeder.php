<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;
use App\Models\Produto;
use App\Models\Cliente;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class PedidosSeeder extends Seeder
{
    public function run()
    {
        $produtos = Produto::all();
        $clientes = Cliente::all();
        $faker = \Faker\Factory::create();

        // Gerar pedidos para os últimos 6 meses
        foreach ($produtos as $produto) {
            foreach (range(1, 7) as $mes) {
                $numPedidos = rand(1, 15); // Quantidade de pedidos por mês

                for ($i = 0; $i < $numPedidos; $i++) {
                    // Escolher um cliente aleatório
                    $cliente = $clientes->random();

                    // Gerar quantidade aleatória dentro de um intervalo razoável
                    $qtdVendida = rand(1, 10);

                    // Garantir que o estoque é suficiente antes de criar o pedido
                    if ($produto->qtd_em_estoque >= $qtdVendida) {
                        $dataPedido = Carbon::now()
                            ->subMonths($mes-1)
                            ->startOfMonth()
                            ->addDays(rand(0, 29)) // Data aleatória no mês
                            ->setTime(rand(8, 20), rand(0, 59), rand(0, 59)); // Hora aleatória

                        Pedido::create([
                            'id_cliente' => $cliente->id,
                            'id_produto' => $produto->id,
                            'qtd_produto' => $qtdVendida,
                            'data_hora' => $dataPedido,
                        ]);

                        // Atualizar estoque
                        $produto->decrement('qtd_em_estoque', $qtdVendida);
                    } else {
                        Log::warning("Estoque insuficiente para o produto.", [
                            'id_produto' => $produto->id,
                            'qtd_em_estoque' => $produto->qtd_em_estoque,
                            'qtd_solicitada' => $qtdVendida,
                        ]);
                    }
                }
            }
        }
    }
}