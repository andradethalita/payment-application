# Aplicação de Dados de Pagamento

Esta é uma aplicação CRUD Angular de Dados de Pagamentos que utiliza o JSON Server como um backend simulado. O JSON Server é uma ferramenta que permite criar uma API REST completa a partir de um arquivo JSON, o que é útil durante o desenvolvimento para simular interações com um backend real.

## Versões utilizadas

- Versão Node = v16.15.1 
- Versão Angular CLI = 14.0.7 

## Pré-requisitos

Certifique-se de ter o Node.js, Angular CLI e o Json Server estão instalados globalmente em sua máquina. Além disso, você precisará instalar as dependências do projeto antes de executá-lo.

- Para verificar instalações, rode os seguintes comandos no seu terminal:

```bash
// Verificar Node:
node -v

// Verificar Angular:
ng version

// Verificar Json Server:
json-server --version

```

- Caso alguma dessas tecnologias não tenha instalado siga seu passo para instalação

1. Instale o Node

- [Node.js](https://nodejs.org/) Instalar versão LTS

2. Intale o Angular

```bash
npm install -g @angular/cli

```

3. Instale o Json Server

```bash
npm install -g json-server
```

### Configurando o projeto

1. Clone este repositório para sua máquina local:

```bash
git clone https://github.com/andradethalita/payment-application.git
cd payment-application
```

1. Instale as dependências do projeto:

```bash
npm install
```

### Executando o JSON Server

O JSON Server será utilizado como o backend simulado para esta aplicação. Ele usará o arquivo db.json da pasta backend para criar uma API REST simulada.

1. No diretório raiz do projeto, execute o seguinte comando para iniciar o servidor JSON:

```bash
json-server ./backend/db.json
```

O servidor estará disponível em http://localhost:3000.

### Executando a Aplicação Angular

1. No diretório raiz do projeto, execute o seguinte comando para iniciar a aplicação:

```bash
ng serve
```

A aplicação estará disponível em http://localhost:4200.

## Uso

Agora você pode acessar a aplicação Angular em seu navegador e interagir com os dados simulados do JSON Server. Certifique-se de que a pasta backend e o arquivo db.json estejam configurados corretamente para que a API simulada funcione conforme o esperado.
