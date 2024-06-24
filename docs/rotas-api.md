### Documentação das Rotas da API

Rotas disponíveis na API:

<br>

<details>
<summary>Obter todos os corretores</summary>
<br>
 
- **URL:** `GET /corretores`
- **Descrição:** Retorna todos os corretores cadastrados no sistema.
- **Exemplo de Requisição:**

`GET http://seuservidor/corretores`

- Exemplo de Resposta (status code: 200 OK):

```json
{
  "status": true,
  "mensagem": "corretores recuperados com sucesso",
  "usuarios": [
    {
      "id": 1,
      "nome": "João Silva",
      "creci": "12345-j",
      "cpf": "123.456.789-00",
    }
    {
      "id": 2,
      "nome": "Maria Souza",
      "creci": "12345-j",
      "cpf": "987.654.321-00",
    }
  ]
}
```

</details>

<details>
<summary>Obter um corretor pelo ID</summary>

- **URL:** `GET /corretores/{id}`
- **Descrição:** Retorna as informações de um corretor com o ID especificado.
- **Exemplo de Requisição:**

  `GET http://seuservidor/corretores/1`

- **Exemplo de Resposta (status code: 200 OK):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "creci": "12345-j",
  "cpf": "123.456.789-00"
}
```

</details>

<details >
<summary>Criar um novo corretor</summary>

- **URL:** `POST /corretores`
- **Descrição:** Cria um novo corretor no sistema.
- **Exemplo de Requisição:**

  `POST http://seuservidor/corretores`

- **Parâmetros a serem enviados como corpo da solicitação (JSON):**

```json
{
  "nome": "Fernanda Oliveira",
  "cpf": "456.789.123-00",
  "creci": "12345-k"
}
```

- **Exemplo de Resposta (status code: 200 OK):**

```json
{
  "status": true,
  "mensagem": "Corretor criado com sucesso",
  "usuario": true
}
```

</details>

 <details>

<summary>Atualizar um corretor pelo ID</summary>

- **URL:** `PUT /corretores/{id}`
- **Descrição:** Atualiza as informações de um corretor com o ID especificado.
- **Exemplo de Requisição:**

  `PUT http://seuservidor/corretores/1`

- **Parâmetros a serem enviados como corpo da solicitação (JSON)**

```json
{
  "nome": "Fernanda Oliveira",
  "cpf": "456.789.123-00",
  "creci": "12345-k"
}
```

- **Exemplo de Resposta (status code: 200 OK):**

```json
{
  "status": true,
  "mensagem": "Corretor atualizado com sucesso",
  "usuario": 1
}
```

</details>

 <details>
<summary>Deletar um corretor pelo ID</summary>

- **URL:** `DELETE /corretores/{id}`
- **Descrição:** Deleta um corretor com o ID especificado.
- **Exemplo de Requisição:**

  `DELETE http://seuservidor/corretores/1`

- **Exemplo de Resposta (status code: 200 OK):**

```json
{
  "status": true,
  "mensagem": "Corretor deletado com sucesso",
  "descricao": "Corretor com ID 1 foi deletado"
}
```

</details>
