<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $sql = "DELETE FROM usuarios WHERE id = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":id", $data->id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuário excluído com sucesso."]);
    } else {
        echo json_encode(["success" => false, "message" => "Não foi possível excluir o usuário."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "ID do usuário não fornecido."]);
}

$conn = null;
?>

