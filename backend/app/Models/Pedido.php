<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
  use HasFactory;

  protected $fillable = [
    // 'id_cliente',
    'id_produto',
    'qtd_produto',
    'data_hora',
    'pagamento',
  ];

  /**
   * Relacionamento: um pedido pertence a um cliente.
   */
  /* public function cliente()
  {
      return $this->belongsTo(Cliente::class, 'id_cliente');
  } */

  /**
   * Relacionamento: um pedido está associado a um produto.
   */
  public function produto()
  {
      return $this->belongsTo(Produto::class, 'id_produto');
  }
}