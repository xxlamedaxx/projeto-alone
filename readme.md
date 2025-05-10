# 📌 Plataforma de Eventos

Este projeto é uma **Plataforma de Eventos com Gerenciamento de Inscrições e Venda de Ingressos**.  
A plataforma permite que organizadores criem eventos personalizados, enquanto usuários podem visualizar eventos disponíveis, realizar inscrições e efetuar a compra de ingressos de forma simples e segura.

---

## ✨ Funcionalidades principais

- Cadastro e autenticação de usuários
- Criação e edição de eventos por organizadores
- Visualização de eventos disponíveis
- Inscrição e compra de ingressos
- Painel administrativo para gerenciamento de eventos e participantes

---

# 🗂️ Estrutura de Pastas e Arquivos

O projeto segue a arquitetura **MVC (Model-View-Controller)**, garantindo uma organização modular e facilitando a manutenção do código. A estrutura de diretórios está organizada da seguinte maneira:

## Diretórios principais

- **assets/** - Contém arquivos estáticos, como imagens.
- **config/** - Arquivos de configuração necessários para o funcionamento da aplicação.
- **controllers/** - Define a lógica de negócio e interage com os modelos para responder às requisições dos usuários.
- **documentos/** - Diretório para armazenar documentação do projeto.
- **models/** - Representa as entidades e interações com o banco de dados.
- **node_modules/** - Contém pacotes e dependências gerenciadas pelo npm.
- **routes/** - Define os endpoints e gerencia o roteamento das requisições.
- **scripts/** - Armazena scripts auxiliares e automações.
- **services/** - Implementa regras de negócio e funcionalidades independentes dos controladores.
- **tests/** - Contém arquivos de teste para validar a integridade do sistema.
- **views/** - Responsável pela camada de apresentação, geralmente contendo arquivos HTML, EJS e CSS.

## Arquivos essenciais na raiz

- `.env.example` - Exemplo de arquivo `.env`, para referência.
- `.gitignore` - Define arquivos e diretórios que devem ser ignorados pelo Git.
- `LICENSE` - Informação sobre a licença do projeto.
- `package-lock.json` e `package.json` - Gerenciam dependências do projeto Node.js.
- `readme.md` - Arquivo de documentação principal.
- `rest.http` - Contém requisições para testes de API.
- `server.js` - Arquivo de inicialização do servidor.

---

# ✨ Como executar o projeto localmente

1- _Clone o repositório_:

```bash
git clone https://github.com/xxlamedaxx/projeto-alone.git
cd PROJETO-ALONE
```

2- _Instale as dependências. Confira se o Node.js esta instalado. Após isso, execute:_

```bash
npm install
```

3- _Para garantir o correto funcionamento do projeto, é necessário criar um arquivo .env na raiz, caso ainda não exista. Dentro dele, defina as variáveis de ambiente com as credenciais do seu banco de dados no Supabase, seguindo o modelo abaixo:_

```bash
DB_USER= "seu_usuario"
DB_HOST= "seu_host"
DB_DATABASE= "seu_banco"
DB_PASSWORD= "sua_senha"
DB_PORT= "sua_porta"
DB_SSL= "true"
PORT= 3000
```

4- _Execute o script de inicialização do banco de dados: Certifique-se de que o banco de dados PostgreSQL está configurado e rodando. Após isso, execute o script SQL para criar as tabelas:_

```bash
node scripts/runSQLScript.js
```

5- _Inicie o servidor: Execute o comando abaixo:_

```bash
npm start
```

6- _Acesse a aplicação: Abra o navegador e acesse:_

```bash
http://localhost:3000
```

7- _Testes (opcional): Caso queira rodar testes, execute:_

```bash
npm test
```
