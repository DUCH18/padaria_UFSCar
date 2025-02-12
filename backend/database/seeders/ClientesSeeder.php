<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClientesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clientes = [
            ['nome' => 'João', 'sobrenome' => 'Silva'],
            ['nome' => 'Maria', 'sobrenome' => 'Oliveira'],
            ['nome' => 'Pedro', 'sobrenome' => 'Santos'],
            ['nome' => 'Ana', 'sobrenome' => 'Costa'],
            ['nome' => 'Lucas', 'sobrenome' => 'Ferreira'],
            ['nome' => 'Carla', 'sobrenome' => 'Almeida'],
            ['nome' => 'Rafael', 'sobrenome' => 'Souza'],
            ['nome' => 'Larissa', 'sobrenome' => 'Pereira'],
            ['nome' => 'Carlos', 'sobrenome' => 'Lima'],
            ['nome' => 'Fernanda', 'sobrenome' => 'Nascimento'],
        ];

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }
    }
}