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
- **models/** - Apresenta verificações mais robustas.
- **node_modules/** - Contém pacotes e dependências gerenciadas pelo npm.
- **repositories** - Entra em contato com banco
- **routes/** - Define os endpoints e gerencia o roteamento das requisições.
- **scripts/** - Armazena scripts auxiliares e automações.
- **services/** - Implementa regras de negócio e funcionalidades independentes dos controladores.
- **views/** - Responsável pela camada de apresentação, geralmente contendo arquivos HTML, CSS e JS.

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

## Prints da Interface / GIFs Curtos

![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_inicio_evento_kcjvhz.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749822332/imagem_2025-06-13_104529708_mucb8z.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_dashboard_w4nq5r.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_dash2_i3xgyh.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_usuarios_wrydfw.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_iniusu_tw4nod.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_inscri_j999l6.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_iniinscri_vqfirx.png)

## Link para o Vídeo de Demonstração

https://youtu.be/hlNW5bW90mI

## Tecnologias Utilizadas

O `projeto-alone` foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express.js**: Framework web para Node.js, utilizado para construir a API e as rotas da aplicação.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional, utilizado para armazenar os dados da aplicação (via Supabase).
- **HTML**: Linguagem de marcação para a estrutura das páginas web.
- **CSS**: Linguagem de estilo para a apresentação visual das páginas.
- **JavaScript**: Linguagem de programação principal, utilizada tanto no frontend quanto no backend.
