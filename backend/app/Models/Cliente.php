<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Pedido;

class Cliente extends Model
{
  use HasFactory;
  
  protected $fillable = [
    'nome',
    'sobrenome',
  ];

  public function pedidos()
  {
    return $this->hasMany(Pedido::class, 'id_cliente');
  }
}