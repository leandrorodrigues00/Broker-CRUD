<?php

namespace App\Model;

class Corretor
{
    private $id;
    private $nome;
    private $cpf;
    private $creci;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    public function getCpf()
    {
        return $this->cpf;
    }

    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }

    public function getCreci()
    {
        return $this->creci;
    }

    public function setCreci($creci)
    {
        $this->creci = $creci;
    }
}
