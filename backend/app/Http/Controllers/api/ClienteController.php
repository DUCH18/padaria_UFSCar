<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

class ClienteController extends Controller
{
    public function store(string $nome, string $sobrenome)
    {   
        return Cliente::create([
            'nome' => $nome,
            'sobrenome' => $sobrenome,
        ]);
    }
}