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

Durante o desenvolvimento do projeto, enfrentei muitos desafios que contribuíram significativamente para meu crescimento técnico e pessoal. Aprender a programar já é uma tarefa complexa, e criar um sistema completo do zero, de forma individual, tornou tudo ainda mais desafiador — mas também recompensador. Por estar sozinho no processo, pude me aprofundar em todas as etapas do desenvolvimento, desde a criação do banco de dados até a configuração do servidor, passando pela implementação da arquitetura MVC e pelo uso de tecnologias como SQL, Express, Joi, HTML, CSS e JavaScript tanto no back-end quanto no front-end.
Um dos maiores obstáculos foi compreender e aplicar corretamente o padrão MVC, especialmente na divisão entre Models, Controllers, Services, Repositories e Routes. No início, houve bastante confusão sobre o papel de cada parte, mas com estudo e prática, consegui entender como essa separação melhora a organização e a manutenção do código. Foi uma experiência valiosa, que me ensinou a importância da estrutura e da clareza em projetos maiores.
A proposta do projeto foi criar uma nova forma de gerenciamento de inscrições, visando oferecer aos organizadores de eventos uma ferramenta mais eficiente e organizada. A aplicação resultante apresenta uma boa estrutura e funcionamento consistente, com validações seguras que, embora eficazes, ainda podem ser aprimoradas com mais tempo.
Atualmente, o sistema está funcional e cumpre os objetivos iniciais. No entanto, existem diversas possibilidades de expansão. Entre os próximos passos, está a implementação de uma tela de cadastro mais completa, permitindo que os usuários criem seus próprios perfis. Isso viabilizará a distinção entre organizadores e participantes, com acessos e funcionalidades personalizadas para cada tipo de usuário.
Além disso, planejo incluir funcionalidades mais robustas, como a venda de ingressos diretamente pela plataforma. A longo prazo, a ambição é criar uma solução capaz de competir com grandes players do setor, como a Blacktag, oferecendo uma alternativa mais acessível, com taxas menores e recursos avançados. Um exemplo já implementado é o dashboard, que fornece aos organizadores insights sobre seus eventos, como a média de idade do público e indicadores de desempenho.
Com essas melhorias e inovações, acredito que o projeto tem potencial para se tornar uma referência no setor de eventos, unindo praticidade, autonomia e inteligência de dados para apoiar decisões estratégicas.

## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---

---

```

```
