<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Produto;

class ProdutosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $produtos = [
            [
                'nome' => 'Pão Francês (unidade)',
                'categoria' => 'Pães',
                'descricao' => 'Pão fresco, macio por dentro  e com casca crocante por fora.',
                'preco' => 0.50,
                'qtd_em_estoque' => 720,
                'imagem' => 'produtos/pao-frances.webp',
            ],
            [
                'nome' => 'Bolo de Chocolate',
                'categoria' => 'Doces',
                'descricao' => 'Bolo macio com cobertura de chocolate derretido e chocolate granulado.',
                'preco' => 15.00,
                'qtd_em_estoque' => 260,
                'imagem' => 'produtos/bolo-de-chocolate.png',
            ],
            [
                'nome' => 'Coxinha de Frango',
                'categoria' => 'Salgados',
                'descricao' => 'Coxinha recheada com frango desfiado e queijo catupiry.',
                'preco' => 3.00,
                'qtd_em_estoque' => 308,
                'imagem' => 'produtos/coxinha-de-frango.jpg',
            ],
            [
                'nome' => 'Croissant',
                'categoria' => 'Pães',
                'descricao' => 'Croissant folhado e amanteigado.',
                'preco' => 3.50,
                'qtd_em_estoque' => 264,
                'imagem' => null,
            ],
            [
                'nome' => 'Brigadeiro',
                'categoria' => 'Doces',
                'descricao' => 'Brigadeiro de chocolate com café, coberto com granulado e ovomaltine.',
                'preco' => 1.50,
                'qtd_em_estoque' => 340,
                'imagem' => null,
            ],
            [
                'nome' => 'Empada de Palmito',
                'categoria' => 'Salgados',
                'descricao' => 'Empada recheada com palmito e temperos.',
                'preco' => 4.00,
                'qtd_em_estoque' => 232,
                'imagem' => 'produtos/empada-de-palmito.jpg',
            ],
            [
                'nome' => 'Pão de Queijo',
                'categoria' => 'Pães',
                'descricao' => 'Pão de queijo macio e saboroso.',
                'preco' => 0.75,
                'qtd_em_estoque' => 400,
                'imagem' => 'produtos/pao-de-queijo.jpg',
            ],
            [
                'nome' => 'Torta de Limão (fatia)',
                'categoria' => 'Doces',
                'descricao' => 'Torta com massa de biscoito e recheio de limão com cobertura de merengue e raspas de limão.',
                'preco' => 17.00,
                'qtd_em_estoque' => 220,
                'imagem' => 'produtos/torta-de-limao.jpg',
            ],
            [
                'nome' => 'Esfiha de Carne',
                'categoria' => 'Salgados',
                'descricao' => 'Esfiha recheada com carne moída e temperos.',
                'preco' => 3.50,
                'qtd_em_estoque' => 242,
                'imagem' => null,
            ],
            [
                'nome' => 'Pão de Batata (unidade)',
                'categoria' => 'Pães',
                'descricao' => 'Pão macio feito com batata.',
                'preco' => 0.55,
                'qtd_em_estoque' => 520,
                'imagem' => 'produtos/pao-de-batata.jpg',
            ],
        ];

        foreach ($produtos as $produto) {
            Produto::create($produto);
        }
    }
}