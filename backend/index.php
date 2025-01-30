<?php
// Habilitar relatório de erros
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar cabeçalhos CORS (caso o .htaccess não funcione)
if (!headers_sent()) {
    header("Access-Control-Allow-Origin: http://localhost:3001");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
}

// Lidar com solicitações OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Incluir arquivo de conexão
require_once 'conexao.php';

// Roteamento simples
$request = $_SERVER['REQUEST_URI'];
$base_path = '/sistema-cadastro-cliente/backend';
$request = str_replace($base_path, '', $request);

switch ($request) {
    case '/cadastrar':
        require __DIR__ . '/cadastrar.php';
        break;
    case '/listar':
        require __DIR__ . '/listar.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint não encontrado']);
        break;
}