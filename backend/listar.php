<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {
    $stmt = $conn->query("
        SELECT id, nome, email, data_nascimento, cpf, 
               telefone, endereco, cidade, estado 
        FROM usuarios 
        ORDER BY id DESC
    ");
    $usuarios = $stmt->fetchAll();
    
    echo json_encode([
        "success" => true,
        "data" => $usuarios
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Erro ao listar usuários: " . $e->getMessage()
    ]);
}

$conn = null;
?>