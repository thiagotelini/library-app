# 📚 Library App

Sistema de gerenciamento de biblioteca desenvolvido com **React, TypeScript, AWS Lambda e DynamoDB**.

O **Library App** é um projeto desenvolvido com o objetivo de realizar o gerenciamento de uma biblioteca, permitindo o cadastro e controle de livros e clientes.

A aplicação foi construída utilizando uma arquitetura em camadas baseada em princípios da **Clean Architecture**, com backend serverless hospedado na AWS e interface web desenvolvida em React.

## 🎯 Objetivo do Projeto

- Utilizar serviços serverless da AWS
- Persistir dados utilizando DynamoDB
- Implementar regras de negócio para gerenciamento de livros e clientes
- Explorar integração entre frontend e backend em nuvem

## 🧠 Como funciona

### Gerenciamento de Livros

- Cadastro de livros
- Consulta de livros cadastrados
- Atualização de informações
- Remoção de livros

Cada livro possui:

- Título
- Autor
- Editora
- Categorias
- Localização na estante
- Status (Disponível ou Emprestado)
- Cliente responsável pelo empréstimo
- Data limite para devolução

### Gerenciamento de Clientes

- Cadastro de clientes
- Consulta de clientes cadastrados
- Atualização de informações
- Remoção de clientes

Cada cliente possui:

- CPF
- Nome
- Telefone
- Endereço

## 🏗 Arquitetura

O backend foi desenvolvido seguindo uma estrutura inspirada em **Clean Architecture**, organizada em camadas:

- Models
- Business (Use Cases)
- Controllers
- Framework (Services, Handlers e Rotas)

A API foi construída utilizando:

- Express
- AWS Lambda
- API Gateway
- DynamoDB

## 💻 Frontend

A interface da aplicação foi desenvolvida utilizando **React** com **Vite** e **TypeScript**, proporcionando uma experiência moderna e responsiva para os usuários.

O frontend é responsável por consumir os serviços disponibilizados pela API, permitindo o gerenciamento completo de livros e clientes através de uma interface simples e intuitiva.

## ▶️ Como executar

### Backend

```bash
cd backend

npm install

npm start
```

A API ficará disponível em:

http://localhost:3000

### Frontend

```bash
cd frontend

npm install

npm run dev
```

A aplicação ficará disponível em:

http://localhost:5173

## ☁️ Deploy

### Backend

O backend foi publicado utilizando:

- AWS Lambda
- API Gateway
- Serverless Framework

### Frontend

O frontend foi publicado utilizando:

- AWS Amplify apontado para repositório no github

# 📄 Autor

Thiago Telini - RA: 25000552
