# 🧑‍🍳 Padaria Web 🥐🥖

Bem-vindo(a) à **Padaria Web**, uma aplicação **Fullstack** desenvolvida para gerenciar o estoque e as vendas de uma padaria fictícia. Este projeto combina **React.js** no frontend e **Laravel** no backend, com **MySQL** como banco de dados relacional.

## Índice

1. [Frontend](#frontend)  
   1.1 [📱 Responsividade](#-responsividade)  
   1.2 [📋 Formulários e Validações](#-formulários-e-validações)  
2. [Backend](#backend)  
   2.1 [⚙️ API](#%EF%B8%8F-api)  
   2.2 [💾 Banco de Dados](#-banco-de-dados)  
3. [🚀 Executando a aplicação localmente](#-executando-a-aplicação-localmente)  

---

## Frontend

Escrito em **TypeScript**, o frontend utiliza a poderosa biblioteca [**React.js**](https://react.dev/) e foi projetado com base em telas prototipadas no [**Figma**](https://figma.com/).

### 📱 Responsividade

Adotamos a abordagem _mobile first_, garantindo que as telas foram desenvolvidas inicialmente para dispositivos móveis, seguidas pelas versões para desktop e dispositivos intermediários, como tablets.  

Essa estratégia assegura uma ótima experiência de uso em qualquer resolução.

### 📋 Formulários e Validações

Os formulários desempenham um papel essencial nesta aplicação, permitindo executar operações CRUD (criação, leitura, atualização e exclusão) de forma confiável e segura.  

Para validação e controle de formulários, utilizamos as bibliotecas:  
- [**Zod**](https://zod.dev/): para validação e modelagem de dados.  
- [**React-Hook-Form**](https://react-hook-form.com/): para gerenciar o estado e envio dos formulários.  

---

## Backend

O backend foi construído com [**Laravel**](https://laravel.com/), um framework PHP robusto, e utiliza um banco de dados relacional estruturado no [**MySQL**](https://www.mysql.com/).

### ⚙️ API

A API REST, desenvolvida com Laravel, gerencia as operações de **criação, leitura, atualização e remoção de dados (CRUD)**.  
O modelo principal da aplicação, "Produto", e seu controlador foram configurados para atender às necessidades específicas do sistema.

### 💾 Banco de Dados

O banco de dados **MySQL** foi escolhido pela sua confiabilidade e eficiência em aplicações relacionais. Ele foi estruturado utilizando as ferramentas nativas do Laravel, como _migrations_, para facilitar a configuração e manutenção.

---

## 🚀 Executando a aplicação localmente  

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.  
**Pré-requisitos:**  
- PHP instalado (recomendado: PHP 8 ou superior).  
- MySQL ou qualquer outro gerenciador de banco de dados compatível.  

### Passos:  

1. **Clone o repositório:**  
   ```bash
   git clone <link-do-repositório>
   cd padaria-web
   ```

2. **Configurar o backend:**  
   2.1 Navegue até a pasta `./backend` e duplique o arquivo `.env.example` para configurar seu banco de dados com as seguintes variáveis:
   ```
   DB_CONNECTION= // SGBD utilizado (mysql, postgres, etc.)
   DB_HOST= // Host do servidor onde o BD está rodando (geralmente é 127.0.0.1)
   DB_PORT= // Porta configurada para o BD no servidor (3306 por padrão)
   DB_DATABASE= // Nome do banco de dados
   DB_USERNAME= // Nome de usuário
   DB_PASSWORD= // Senha
   ```
   2.? Caso você esteja usando o **PostgreSQL**, siga os passos abaixo:

      1. Procure pela sub-pasta `../database/migrations`
      2. Abra o arquivo `2024_12_12_225747_add_imagem_to_produtos_table.php` e substitua o código da **linha 14** e da **linha 22** pelos escritos abaixo **respectivamente**:
   
         ```php
         // substituir linha 14
         Schema::table('produtos', function (Blueprint $table) {
            $table->binary('imagem')->nullable();
         });
         ```
         
         ```php
         // substituir linha 22
         Schema::table('produtos', function (Blueprint $table) {
            $table->dropColumn('imagem');
         });
         ```
      3. Abra o arquivo `2025_01_06_121005_add_quantity_in_stock_column_to_table.php` e substitua o código da **linha 15** e da **linha 25** pelos escritos abaixo **respectivamente**:
   
         ```php
         // substituir linha 15
         Schema::table('produtos', function (Blueprint $table) {
            $table->integer('qtd_em_estoque')->default(0)->notNull();
         });
         ```
         
         ```php
         // substituir linha 25
         Schema::table('produtos', function (Blueprint $table) {
            $table->dropColumn('qtd_em_estoque');
         });
         ```

   2.2 Vá até a pasta do php em seu disco local (`C:\php`), abra o arquivo `php.ini` com o bloco de notas e pesquise (`Ctrl`+`f`) pelas seguintes configurações:
      1. `extension=fileinfo`
      2. `extension=zip`
  
   2.3 Por fim, com tudo feito, execute os comandos a seguir em seu terminal:  
      ```bash
      composer install
      php artisan migrate
      php artisan db:seed
      php artisan serve
      ```

4. **Configurar o frontend:**  
   Em outro terminal, vá para a pasta `./frontend` e execute:  
   ```bash
   pnpm install
   pnpm run dev
   ```

   > 💡 **Dica:** Se estiver usando o **VS Code no Windows**, você pode dividir o terminal em dois pressionando `Ctrl`+`Shift`+`5` e rodar cada parte da aplicação em um terminal diferente

Acesse `http://localhost:5173` (ou conforme indicado pelo terminal em `./frontend`) e com isso, você estará pronto(a) para explorar o sistema de gerenciamento de estoque e vendas da Padaria Web! 😉
