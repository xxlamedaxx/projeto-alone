# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto

**KING TAG**

#### Autor do projeto

**Leonardo Lameda**

## Sumário

1. [Introdução](#c1)
2. [Visão Geral da Aplicação Web](#c2)
3. [Projeto Técnico da Aplicação Web](#c3)
4. [Desenvolvimento da Aplicação Web](#c4)
5. [Referências](#c5)

<br>

# Plataforma de Eventos

## <a name="c1"></a>1. Introdução (Semana 01)

A **Plataforma de Eventos** é um sistema web desenvolvido para facilitar a criação, divulgação e gerenciamento de eventos. O sistema permite que organizadores cadastrem seus eventos e gerenciem inscrições. Os participantes podem visualizar eventos disponíveis e realizar inscrições.

O principal objetivo da aplicação é proporcionar uma experiência eficiente e acessível tanto para organizadores quanto para participantes, garantindo uma interface amigável, um sistema de controle de acesso seguro e funcionalidades voltadas para uma gestão completa de eventos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

#### **Organizador de Eventos**

- **Nome:** Lucas Ferreira
- **Idade:** 35 anos
- **Profissão:** Empresário do ramo de eventos
- **Objetivo:** Criar e gerenciar eventos de forma prática e monitorando inscrições.
- **Frustração:** Dificuldade em acompanhar as inscrições e divulgar seus eventos para o público certo.

#### **Participante de Eventos**

- **Nome:** Mariana Souza
- **Idade:** 28 anos
- **Profissão:** Designer
- **Objetivo:** Encontrar e participar de eventos relevantes.
- **Frustração:** Processos complexos e falta de informações claras sobre eventos disponíveis.

---

### 2.2. User Stories (Semana 01 - opcional)

#### **US01 - Cadastro de Eventos**

Como **organizador**, quero **cadastrar um novo evento**, para que **ele seja divulgado na plataforma**.

#### **US02 - Compra de Ingressos**

Como **participante**, quero **fazer minha inscrição**, para que **possa garantir minha presença**.

#### **US03 - Painel Administrativo**

Como **organizador**, quero **visualizar um painel administrativo com estatísticas de inscrição**, para que **eu possa acompanhar o desempenho do meu evento**.

#### **Explicação do INVEST da US01**

- **Independente:** O cadastro de eventos pode ser desenvolvido sem dependências diretas com outros módulos.
- **Negociável:** O organizador pode definir diferentes categorias e tipos de eventos.
- **Valioso:** Permite a divulgação e alcance de público interessado.
- **Estimável:** É possível definir estimativas de desenvolvimento para essa funcionalidade.
- **Small:** O escopo da funcionalidade é claro e objetivo.
- **Testável:** Pode-se testar se o evento foi cadastrado corretamente e está visível para participantes.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados (Semana 3)

![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1747831735/Untitled_1_vj9zec.png)

# Modelo Físico do Banco de Dados

O modelo físico da aplicação está implementado no arquivo `init.sql`, que contém os comandos de criação das tabelas e relacionamentos do sistema.

As principais entidades do banco de dados são:

- **usuarios**: informações básicas dos usuários (participantes e organizadores);
- **inscrições**: registra as inscrições dos participantes nos eventos, relacionando o usuário inscrito, o evento correspondente e detalhes do participante (nome, idade), além da data da inscrição;
- **eventos**: eventos cadastrados por organizadores;

## Modelo Fisico (Esta no init.sql)

```sql
-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL  -- Armazene a senha criptografada
);

-- Tabela de Eventos
CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  imagem_url VARCHAR(255),
  criador_id INT NOT NULL REFERENCES usuarios(id),
  criado_em TIMESTAMP DEFAULT now()
);

-- Tabela de Inscrições
CREATE TABLE IF NOT EXISTS inscricoes (
  id SERIAL PRIMARY KEY,
  evento_id INT NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
  usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome_participante VARCHAR(100) NOT NULL,
  idade_participante INT,
  data_inscricao TIMESTAMP DEFAULT now()
);


```

### 3.1.1 BD e Models (Semana 5)

# Models Implementados no Sistema Web

O sistema possui três _models_ principais, responsáveis por realizar a comunicação com o banco de dados PostgreSQL por meio de queries SQL utilizando o módulo `pg`. Os _models_ seguem uma arquitetura de acesso a dados, centralizando as operações CRUD de cada entidade.

---

## 1. EventoModel

Responsável pelo gerenciamento de eventos cadastrados na plataforma. As principais funções implementadas incluem:

- `listarEventos()` – Retorna todos os eventos registrados no banco.
- `criarEvento(titulo, descricao, imagem_url, criador_id)` – Insere um novo evento com os dados informados.
- `buscarEventoPorId(id)` – Retorna um evento específico com base no seu ID.
- `editarEvento(id, titulo, descricao, imagem_url)` – Atualiza as informações de um evento.
- `deletarEvento(id)` – Remove um evento do banco de dados.
- `buscarInscricoesDoEvento(id)` – Retorna os dados dos participantes inscritos em um determinado evento.

---

## 2. InscricaoModel

Gerencia as inscrições de usuários nos eventos. Suas funcionalidades principais são:

- `listarInscricoes()` – Lista todas as inscrições feitas.
- `criarInscricao(evento_id, usuario_id, nome_participante, idade_participante)` – Cadastra uma nova inscrição.
- `buscarInscricaoPorId(id)` – Retorna os dados de uma inscrição específica.
- `editarInscricao(id, nome_participante, idade_participante)` – Permite a edição dos dados do participante inscrito.
- `deletarInscricao(id)` – Exclui uma inscrição do banco.

---

## 3. UsuarioModel

Realiza o controle dos usuários da aplicação. Suporta as seguintes operações:

- `listarUsuarios()` – Retorna todos os usuários cadastrados, exceto a senha.
- `criarUsuario(nome, email, senha)` – Adiciona um novo usuário ao sistema.
- `buscarUsuarioPorId(id)` – Busca um usuário específico pelo ID.
- `editarUsuario(id, nome, email)` – Altera nome e email de um usuário.
- `deletarUsuario(id)` – Remove um usuário do sistema.

### 3.2. Arquitetura (Semana 5)

![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1747952444/Editor___Mermaid_Chart-2025-05-22-221929_iulbmc.png)

### 3.3. Wireframes (Semana 03 - opcional)

### 3.4. Guia de estilos (Semana 05 - opcional)

_Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução._

### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

_Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização)._

### 3.6. WebAPI e endpoints (Semana 05)

<a href="wad2.md">Abrir especificações endpoints</a>

### 3.7 Interface e Navegação (Semana 07)

Foi desenvolvido um **sistema web de gerenciamento de eventos** que permite criar e acompanhar eventos de forma prática e eficiente. Entre as funcionalidades implementadas estão:

- Tela de **criação de novos eventos**, onde é possível inserir todas as informações necessárias;
- Uma **dashboard** que apresenta dados detalhados sobre cada evento, como número de inscritos, idade média dos participantes e a lista com os nomes das pessoas registradas;
- Telas específicas para o **cadastro de novos usuários** e para a **inscrição desses usuários** em eventos.

A proposta da aplicação é atender **clientes organizadores de eventos**: ao firmar um contrato, o organizador fornece as informações dos eventos e a lista de participantes, e então toda a estrutura do sistema é montada com base nesses dados. Após a entrega, o cliente recebe acesso à plataforma e consegue acompanhar, de forma centralizada, como estão sendo conduzidos os eventos sob sua responsabilidade.

![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_inicio_evento_kcjvhz.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749822332/imagem_2025-06-13_104529708_mucb8z.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_dashboard_w4nq5r.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_dash2_i3xgyh.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_usuarios_wrydfw.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_iniusu_tw4nod.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821156/Captura_inscri_j999l6.png)
![image](https://res.cloudinary.com/dtxiyeitw/image/upload/v1749821157/Captura_iniinscri_vqfirx.png)

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

_VIDEO: Insira o link do vídeo demonstrativo nesta seção_
_Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar._

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

## <a name="c6"></a>5. Decisões Técnicas

Nesta seção, detalhamos as principais decisões técnicas que guiaram o desenvolvimento do projeto, abrangendo a escolha de frameworks, bibliotecas e padrões de arquitetura.

- **Arquitetura MVC (Model-View-Controller):** Adoção da arquitetura MVC para promover a separação de responsabilidades, facilitando a organização do código, a manutenção e a escalabilidade do projeto. Os `models` lidam com a lógica de negócios e interação com o banco de dados, as `views` são responsáveis pela apresentação dos dados ao usuário, e os `controllers` gerenciam as requisições e orquestram a interação entre models e views.

- **Node.js e Express.js:** Utilização do Node.js como ambiente de execução e Express.js como framework web. Essa escolha proporciona um ambiente de desenvolvimento JavaScript completo, desde o backend até o frontend (com EJS), permitindo a construção de aplicações web robustas e escaláveis.

- **PostgreSQL como Banco de Dados:** O PostgreSQL foi selecionado devido à sua robustez, confiabilidade e capacidade de lidar com grandes volumes de dados. Sua conformidade com SQL e o suporte a recursos avançados garantem a integridade e a segurança das informações do sistema.

- **Validação de Dados com Joi:** A biblioteca Joi foi integrada para realizar a validação de esquemas de dados nos `models`. Isso garante que os dados recebidos pela aplicação estejam em conformidade com as regras de negócio definidas, prevenindo erros e aumentando a segurança e a confiabilidade do sistema.

- **Testes Unitários com Jest:** A implementação de testes unitários utilizando o Jest assegura a qualidade e a estabilidade do código. Os testes cobrem as funcionalidades dos `models`, garantindo que as validações e operações de banco de dados funcionem conforme o esperado, facilitando a detecção precoce de bugs e a refatoração segura.

---

## <a name="c7"></a>6. Aprendizados e Desafios

O desenvolvimento deste projeto proporcionou diversos aprendizados e desafios, que contribuíram significativamente para o aprimoramento das habilidades técnicas e de resolução de problemas.

- **Aprendizados:**

  - Aprofundamento na arquitetura MVC e sua aplicação prática em projetos Node.js.
  - Melhor compreensão sobre a importância da validação de dados e como implementá-la de forma eficaz com Joi.
  - Experiência na escrita de testes unitários robustos com Jest, cobrindo diferentes cenários e garantindo a qualidade do código.
  - Gerenciamento de dependências e scripts de projeto com npm.
  - Integração e manipulação de banco de dados PostgreSQL com Node.js.

- **Desafios:**
  - Configuração inicial do ambiente de desenvolvimento e integração das diferentes tecnologias (Node.js, Express, PostgreSQL, Joi, Jest).
  - Implementação de validações complexas nos `models` para garantir a integridade dos dados, especialmente em cenários de criação e atualização.
  - Escrita de testes unitários abrangentes que cobrissem todas as validações e lógicas de negócio, incluindo a simulação de interações com o banco de dados (mocks).
  - Refatoração de código existente para incorporar as novas validações e testes, garantindo a compatibilidade e minimizando impactos.

---

## <a name="c8"></a>7. Pontos de Melhoria

Durante o desenvolvimento e após a conclusão das funcionalidades principais, foram identificados alguns pontos que poderiam ser aprimorados em futuras iterações do projeto:

- **Autenticação e Autorização:** Implementar um sistema de autenticação e autorização mais robusto, utilizando tokens JWT (JSON Web Tokens) para proteger as rotas da API e controlar o acesso dos usuários com base em seus papéis (organizador, participante).

- **Tratamento de Erros Global:** Centralizar o tratamento de erros na aplicação para fornecer respostas padronizadas e mais informativas aos clientes da API, melhorando a experiência do desenvolvedor e a depuração.

- **Otimização de Queries de Banco de Dados:** Analisar e otimizar as queries SQL para melhorar o desempenho da aplicação, especialmente em cenários com grande volume de dados ou requisições complexas.

- **Interface do Usuário (Frontend):** Aprimorar a interface do usuário com um design mais responsivo e interativo, utilizando frameworks frontend modernos (como React ou Vue.js) para proporcionar uma experiência mais rica aos usuários.

- **CI/CD (Integração Contínua/Entrega Contínua):** Configurar um pipeline de CI/CD para automatizar o processo de build, teste e deploy da aplicação, garantindo entregas mais rápidas e confiáveis.

- **Documentação da API:** Gerar uma documentação interativa da API (e.g., com Swagger/OpenAPI) para facilitar o consumo dos endpoints por outros desenvolvedores.

## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---

---

```

```
