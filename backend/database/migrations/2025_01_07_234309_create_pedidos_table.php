<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            /* $table->foreignId('id_cliente')
                  ->constrained('clientes')
                  ->onUpdate('cascade'); */
            $table->foreignId('id_produto')
                  ->constrained('produtos')
                  ->onUpdate('cascade');
            $table->integer('qtd_produto')->unsigned();
            $table->dateTime('data_hora');
            $table->enum('pagamento', ['Pix', 'Crédito', 'Débito']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};