<?php

namespace App\Controller;

use App\Model\Database;

class CorretorController{
    private $corretor;
    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function index(){
        return $corretores = $this->db->getAllCorretores();
    }

    public function store($data){
        if (
            !isset($data["name"]) ||
            !isset($data["cpf"]) ||
            !isset($data["creci"])
        ) {
            return [
                "status" => false,
                "mensagem" =>
                    "Dados incompletos. Verifique se todos os campos foram preenchidos.",
            ];
        }

        // Validações mais robustas, como verificar se o CPF é válido, poderiam ser implementadas aqui.
        // Como fiz validações no frontend, estou focando em verificações básicas no backend.

        if ($this->db->checkCorretorByCPF($data["cpf"])) {
            return [
                "status" => false,
                "mensagem" => "Corretor com este CPF já está cadastrado.",
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
                "mensagem" => "Corretor criado com sucesso.",
                "corretor" => [
                    "nome" => $data["name"],
                    "cpf" => $data["cpf"],
                    "creci" => $data["creci"],
                ],
            ];
        } else {
            return [
                "status" => false,
                "mensagem" => "Erro ao criar corretor.",
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
                    "Dados incompletos. Verifique se todos os campos foram preenchidos.",
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
                "mensagem" => "Corretor atualizado com sucesso.",
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
                "mensagem" => "Erro ao atualizar corretor.",
            ];
        }
    }

    public function delete($id)
    {
        $success = $this->db->deleteCorretor($id);

        if ($success) {
            return [
                "status" => true,
                "mensagem" => "Corretor deletado com sucesso",
                "descricao" => "Corretor com ID $id foi deletado",
            ];
        } else {
            return [
                "status" => false,
                "mensagem" => "Erro ao deletar o corretor",
                "descricao" => "Ocorreu um problema ao tentar deletar o corretor com ID $id",
            ];
        }
    }

    public function getById($id)
    {
        $corretor = $this->db->getCorretorById($id);

        if (!$corretor) {
            return [
                "status" => false,
                "mensagem" => "Corretor não encontrado.",
                "corretor" => null,
            ];
        }

        return [
            "status" => true,
            "mensagem" => "Corretor recuperado com sucesso.",
            "corretor" => $corretor,
        ];
    }
}
