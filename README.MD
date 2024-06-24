## 🎥 Video do projeto

Para ver o projeto em execução, assista ao vídeo disponível no link:
[Clique aqui](https://drive.google.com/file/d/1JmyvBE2soyUYhp6N-pknTyXuCLPlZqiA/view)

## 💻 Executando o projeto

Para rodar a aplicação, você vai precisar executar o servidor PHP na pasta `/server` e o aplicativo web na pasta `/web`.

### Requisitos

- [PHP 8.3.8 ](https://www.php.net/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) ou [PNPM](https://pnpm.io/pt/) _(exemplos são com PNPM)_

**Comece acessando a pasta do servidor no seu terminal:**

```bash
$ cd server
```

**Para executar o aplicativo back-end, você precisa seguir as etapas abaixo**

Antes de iniciar o servidor back-end, verifique se o banco de dados está configurado corretamente. Acesse `/server/src/Molde/Database.php` e ajuste os parâmetros de conexão ($host, $db_name, $username e $password) conforme necessário.

Na pasta `/server/database`, você encontrará um script SQL que pode ser usado para criar o banco da aplicação, além de um arquivo mysqldump com um backup do banco utilizado.

Após isso é só iniciar o servidor, acessando a pasta public:

```bash
# Iniciar o servidor na porta 8000
$ cd public/
$ php -S localhost:8000

```

**Para executar o front-end, você precisa seguir as etapas abaixo**

Deixe o servidor php rodando, abra um novo terminal, agora acesse a pasta web:

```bash
# Acessar a pasta do front-end
$ cd web

# Instale as dependências do projeto
$ pnpm i

# Iniciar o aplicativo
$ pnpm run dev

# Seu frontend estará disponível na URL http://localhost:3000/
```

**OBSERVAÇÃO:** No diretório /frontend, você encontrará o arquivo `.env`. Dentro deste arquivo, a URL do servidor php está configurada como `http://localhost:8000`. Se o seu servidor estiver em outra URL, será necessário fazer a devida alteração neste arquivo.

## 🚀 Tecnologias

- [PHP](https://www.php.net/)
- [NextJs 14](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Sonner Toaster](https://sonner.emilkowal.ski/)
- [Tailwind Css](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://github.com/colinhacks/zod)

## Rotas Api

As rotas da API backend estão documentadas [Neste link](./docs/rotas-api.md).

## Repositório github

Disponível no github em: [Neste link](./docs/rotas-api.md).
