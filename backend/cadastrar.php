<?php
header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

try {
    $data = json_decode(file_get_contents("php://input"));
    
    // Validar campos obrigatórios
    $required_fields = ['nome', 'dataNascimento', 'cpf', 'email', 'telefone', 'endereco', 'cidade', 'estado'];
    foreach ($required_fields as $field) {
        if (!isset($data->$field) || empty(trim($data->$field))) {
            throw new Exception("Campo $field é obrigatório");
        }
    }
    
    // Limpar e validar dados
    $nome = trim($data->nome);
    $dataNascimento = trim($data->dataNascimento);
    $cpf = preg_replace('/[^0-9]/', '', $data->cpf);
    $email = trim($data->email);
    $telefone = preg_replace('/[^0-9]/', '', $data->telefone);
    $endereco = trim($data->endereco);
    $cidade = trim($data->cidade);
    $estado = trim($data->estado);
    
    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Email inválido");
    }
    
    // Validar CPF (adicione sua própria validação se necessário)
    if (strlen($cpf) !== 11) {
        throw new Exception("CPF inválido");
    }
    
    // Inserir no banco de dados
    $stmt = $conn->prepare("
        INSERT INTO usuarios (
            nome, data_nascimento, cpf, email, telefone, 
            endereco, cidade, estado
        ) VALUES (
            :nome, :dataNascimento, :cpf, :email, :telefone,
            :endereco, :cidade, :estado
        )
    ");
    
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':dataNascimento', $dataNascimento);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':endereco', $endereco);
    $stmt->bindParam(':cidade', $cidade);
    $stmt->bindParam(':estado', $estado);
    
    $stmt->execute();
    
    $id = $conn->lastInsertId();
    
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "data" => [
            "id" => (int)$id,
            "nome" => $nome,
            "email" => $email,
            "dataNascimento" => $dataNascimento,
            "cpf" => $cpf,
            "telefone" => $telefone,
            "endereco" => $endereco,
            "cidade" => $cidade,
            "estado" => $estado
        ]
    ]);
    
} catch(Exception $e) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}

$conn = null;
?>