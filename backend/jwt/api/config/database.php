<?php
// используем для подключения к базе данных MySQL 
class Database {
 
    // учетные данные базы данных 
    private $host = "mysql";
    private $db_name = "kiviapp";
    private $username = "root";
    private $password = "root";
    public $conn;
 
    // получаем соединение с базой данных 
    public function getConnection() {
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}

