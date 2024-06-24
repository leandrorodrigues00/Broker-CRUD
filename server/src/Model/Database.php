<?php

namespace App\Model;

use Exception;
use PDO;
use PDOException;

class Database
{
    private $host = "localhost";
    private $db_name = "teste_programacao";
    private $username = "root";
    private $password = "123456";
    private $conn;
    private $db_type = "mysql"; // Opções: "mysql", "pgsql", "sqlite", "mssql"
    /*Dependendo do tipo de banco de dados escolhido, você pode precisar ajustar os parâmetros de conexão ($host, $db_name, $username e $password) da seguinte forma:

          MySQL:
          
          $host: Endereço do servidor MySQL (por exemplo, 'localhost' ou o IP do servidor)
          $db_name: Nome do banco de dados MySQL
          $username: Nome de usuário para acessar o banco de dados MySQL
          $password: Senha para acessar o banco de dados MySQL
          PostgreSQL:
          
          $host: Endereço do servidor PostgreSQL (por exemplo, 'localhost' ou o IP do servidor)
          $db_name: Nome do banco de dados PostgreSQL
          $username: Nome de usuário para acessar o banco de dados PostgreSQL
          $password: Senha para acessar o banco de dados PostgreSQL
          SQLite:
          
          $host: Não é necessário para SQLite, pois é um banco de dados baseado em arquivo
          $db_name: Caminho completo para o arquivo do banco de dados SQLite (por exemplo, 'my_database.sqlite')
          $username: Não é necessário para SQLite
          $password: Não é necessário para SQLite
          SQL Server (MSSQL):
          
          $host: Endereço do servidor SQL Server (por exemplo, 'localhost' ou o IP do servidor)
          $db_name: Nome do banco de dados SQL Server
          $username: Nome de usuário para acessar o banco de dados SQL Server
          $password: Senha para acessar o banco de dados SQL Server
          */

    public function __construct()
    {
        $this->connect();
    }

    private function connect()
    {
        $this->conn = null;

        try {
            switch ($this->db_type) {
                case "mysql":
                    $dsn =
                        "mysql:host=" .
                        $this->host .
                        ";dbname=" .
                        $this->db_name;
                    break;
                case "pgsql":
                    $dsn =
                        "pgsql:host=" .
                        $this->host .
                        ";dbname=" .
                        $this->db_name;
                    break;
                case "sqlite":
                    $databasePath = "/app/database/sqlite/test_drive.db";
                    $dsn = "sqlite:" . $databasePath;
                    $filepath = $databasePath;
                    if (!file_exists($filepath)) {
                        die("Arquivo não encontrado: $filepath");
                    }
                    break;
                case "mssql":
                    $dsn =
                        "sqlsrv:Server=" .
                        $this->host .
                        ";Database=" .
                        $this->db_name;
                    break;
                default:
                    throw new Exception("Database type not supported.");
            }
            if ($this->db_type == "sqlite") {
                $this->conn = new PDO($dsn);
            } else {
                $this->conn = new PDO($dsn, $this->username, $this->password);
            }
            $this->conn->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        } catch (Exception $exception) {
            echo $exception->getMessage();
        }
    }

    public function getAllCorretores()
    {
        $query = "SELECT * FROM corretores";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertCorretor($name, $cpf, $creci)
    {
        try {
            $query =
                "INSERT INTO corretores (name, cpf, creci) VALUES (:name, :cpf, :creci)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":name", $name);
            $stmt->bindValue(":cpf", $cpf);
            $stmt->bindValue(":creci", $creci);
            $stmt->execute();

            return true;
        } catch (PDOException $e) {
            echo "Erro ao inserir corretor: " . $e->getMessage();
            return false;
        }
    }

    public function checkCorretorByCPF($cpf)
    {
        $query = "SELECT COUNT(*) FROM corretores WHERE cpf = :cpf";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(":cpf", $cpf);
        $stmt->execute();
        return $stmt->fetchColumn() > 0;
    }

    public function deleteCorretor($id)
    {
        try {
            $query = "DELETE FROM corretores WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);
            $stmt->execute();

            return true;
        } catch (PDOException $e) {
            echo "Erro ao deletar corretor: " . $e->getMessage();
            return false;
        }
    }

    public function updateCorretor($id, $name, $cpf, $creci)
    {
        try {
            $query =
                "UPDATE corretores SET name = :name, cpf = :cpf, creci = :creci WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":name", $name);
            $stmt->bindValue(":cpf", $cpf);
            $stmt->bindValue(":creci", $creci);
            $stmt->bindValue(":id", $id);
            $stmt->execute();

            return true;
        } catch (PDOException $e) {
            echo "Erro ao atualizar corretor: " . $e->getMessage();
            return false;
        }
    }

    public function getCorretorById($id)
    {
        try {
            $query = "SELECT * FROM corretores WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id", $id);
            $stmt->execute();

            $corretor = $stmt->fetch(PDO::FETCH_ASSOC);

            return $corretor ? $corretor : null;
        } catch (PDOException $e) {
            echo "Erro ao buscar corretor por ID: " . $e->getMessage();
            return null;
        }
    }
}
