<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ProdutoController;
use App\Http\Controllers\api\PedidoController;

Route::get('produtos', [ProdutoController::class, 'index']);
Route::post('produtos', [ProdutoController::class, 'store']);
Route::get('produtos/{id}', [ProdutoController::class, 'show']);
Route::put('produtos/{id}', [ProdutoController::class, 'update']);
Route::delete('produtos/{id}', [ProdutoController::class, 'destroy']);
Route::get('relatorio/{id}', [PedidoController::class, 'relatorioMensal']);
Route::get('best-sellers', [PedidoController::class, 'getFourBestSellers']);
Route::post('vendas', [PedidoController::class, 'store']);