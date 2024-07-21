<?php

namespace App\Controller;

use App\Model\Database;

class CorretorController
{
    private $corretor;
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function index()
    {
        return $corretores = $this->db->getAllCorretores();
    }

    public function store($data)
    {
        if (
            !isset($data["name"]) ||
            !isset($data["cpf"]) ||
            !isset($data["creci"])
        ) {
            return [
                "status" => false,
                "mensagem" =>
                    "Incomplete data. Please ensure all fields are filled in.",
            ];
        }

        // Validações mais robustas, como verificar se o CPF é válido, poderiam ser implementadas aqui.
        // Como fiz validações no frontend, estou focando em verificações básicas no backend.

        if ($this->db->checkCorretorByCPF($data["cpf"])) {
            return [
                "status" => false,
                "mensagem" => "A broker with this CPF is already registered.",
            ];
        }

        $success = $this->db->insertCorretor(
            $data["name"],
            $data["cpf"],
            $data["creci"]
        );

        if ($success) {
            return [
                "status" => true,
                "mensagem" => "Broker created successfully.",
                "corretor" => [
                    "nome" => $data["name"],
                    "cpf" => $data["cpf"],
                    "creci" => $data["creci"],
                ],
            ];
        } else {
            return [
                "status" => false,
                "mensagem" => "Error creating broker.",
            ];
        }
    }

    public function update($id, $data)
    {
        if (
            !isset($data["name"]) ||
            !isset($data["cpf"]) ||
            !isset($data["creci"])
        ) {
            return [
                "status" => false,
                "mensagem" =>
                    "Incomplete data. Please check if all fields are filled in."
            ];
        }

        $success = $this->db->updateCorretor(
            $id,
            $data["name"],
            $data["cpf"],
            $data["creci"]
        );

        if ($success) {
            return [
                "status" => true,
                "mensagem" => "Broker updated successfully.",
                "corretor" => [
                    "id" => $id,
                    "nome" => $data["name"],
                    "cpf" => $data["cpf"],
                    "creci" => $data["creci"],
                ],
            ];
        } else {
            return [
                "status" => false,
                "mensagem" => "Error updating broker.",
            ];
        }
    }

    public function delete($id)
    {
        $success = $this->db->deleteCorretor($id);

        if ($success) {
            return [
                "status" => true,
                "mensagem" => "Broker deleted successfully",
                "descricao" => "Broker with ID $id has been deleted",
            ];
        } else {
            return [
                "status" => false,
                "mensagem" => "Error deleting broker",
                "descricao" => "There was a problem trying to delete the broker with ID $id",
            ];
        }
    }

    public function getById($id)
    {
        $corretor = $this->db->getCorretorById($id);

        if (!$corretor) {
            return [
                "status" => false,
                "mensagem" => "Broker not found.",
                "corretor" => null,
            ];
        }

        return [
            "status" => true,
            "mensagem" => "Broker retrieved successfully.",
            "corretor" => $corretor,
        ];
    }
}
