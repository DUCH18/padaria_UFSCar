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
        Schema::table('produtos', function (Blueprint $table) {
            // Altera o tipo de dados da coluna 'imagem' para 'bytea'
            $table->binary('imagem')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produtos', function (Blueprint $table) {
            // Reverte a alteração, voltando ao tipo original (se necessário)
            $table->binary('imagem')->nullable()->change();
        });
    }
};