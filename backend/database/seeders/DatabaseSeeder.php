<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run()
  {
    $this->call(ProdutosSeeder::class);
    // $this->call(ClientesSeeder::class);
    $this->call(PedidosSeeder::class);
  }
}