<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id) &&
    !empty($data->nome) &&
    !empty($data->email) &&
    !empty($data->cpf) &&
    !empty($data->data_nascimento) &&
    !empty($data->telefone) &&
    !empty($data->endereco) &&
    !empty($data->cidade) &&
    !empty($data->estado)
) {
    $sql = "UPDATE usuarios SET 
                nome = :nome,
                email = :email,
                cpf = :cpf,
                data_nascimento = :data_nascimento,
                telefone = :telefone,
                endereco = :endereco,
                cidade = :cidade,
                estado = :estado
            WHERE id = :id";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":id", $data->id);
    $stmt->bindParam(":nome", $data->nome);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":cpf", $data->cpf);
    $stmt->bindParam(":data_nascimento", $data->data_nascimento);
    $stmt->bindParam(":telefone", $data->telefone);
    $stmt->bindParam(":endereco", $data->endereco);
    $stmt->bindParam(":cidade", $data->cidade);
    $stmt->bindParam(":estado", $data->estado);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuário atualizado com sucesso."]);
    } else {
        echo json_encode(["success" => false, "message" => "Não foi possível atualizar o usuário."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Dados incompletos."]);
}

$conn = null;
?>

