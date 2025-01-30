<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "meu_banco";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    http_response_code(500);
    die(json_encode([
        "success" => false,
        "error" => "Erro de conexão: " . $e->getMessage()
    ]));
}
?>

