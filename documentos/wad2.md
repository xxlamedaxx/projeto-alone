### 3.6. WebAPI e endpoints (Semana 05)

A API da Plataforma de Eventos segue os padrões REST e está organizada em três módulos principais: **Usuários**, **Eventos** e **Inscrições**. Todos os endpoints retornam dados em formato JSON e utilizam códigos de status HTTP apropriados.

**Base URL**: `http://localhost:3000/api`

---

## 📋 **Endpoints de Usuários**

### **GET /api/usuarios**

Lista todos os usuários cadastrados no sistema.

**Resposta de sucesso (200):**

```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
]
```

### **POST /api/usuarios**

Cria um novo usuário no sistema.

**Body da requisição:**

```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

**Resposta de sucesso (201):**

```json
{
  "id": 2,
  "nome": "Maria Santos",
  "email": "maria@email.com"
}
```

**Erros possíveis:**

- `400`: Dados obrigatórios não informados
- `500`: Email já está em uso

### **GET /api/usuarios/:id**

Busca um usuário específico pelo ID.

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

**Erros possíveis:**

- `404`: Usuário não encontrado
- `500`: ID inválido

### **PUT /api/usuarios/:id**

Atualiza os dados de um usuário existente.

**Body da requisição:**

```json
{
  "nome": "João Santos Silva",
  "email": "joao.santos@email.com"
}
```

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "nome": "João Santos Silva",
  "email": "joao.santos@email.com"
}
```

**Erros possíveis:**

- `404`: Usuário não encontrado
- `500`: Email já está em uso por outro usuário

### **DELETE /api/usuarios/:id**

Remove um usuário do sistema.

**Resposta de sucesso (204):** Sem conteúdo

**Erros possíveis:**

- `404`: Usuário não encontrado
- `500`: Erro interno do servidor

---

## 🎯 **Endpoints de Eventos**

### **GET /api/eventos**

Lista todos os eventos cadastrados, incluindo informações do criador.

**Resposta de sucesso (200):**

```json
[
  {
    "id": 1,
    "titulo": "Workshop de Node.js",
    "descricao": "Aprenda Node.js do básico ao avançado",
    "imagem_url": "https://exemplo.com/imagem.jpg",
    "criador_id": 1,
    "criador_nome": "João Silva",
    "criado_em": "2024-01-15T10:30:00.000Z"
  }
]
```

### **POST /api/eventos**

Cria um novo evento no sistema.

**Body da requisição:**

```json
{
  "titulo": "Palestra sobre IA",
  "descricao": "Tendências em Inteligência Artificial",
  "imagem_url": "https://exemplo.com/ia.jpg",
  "criador_id": 1
}
```

**Resposta de sucesso (201):**

```json
{
  "id": 2,
  "titulo": "Palestra sobre IA",
  "descricao": "Tendências em Inteligência Artificial",
  "imagem_url": "https://exemplo.com/ia.jpg",
  "criador_id": 1,
  "criado_em": "2024-01-16T14:20:00.000Z"
}
```

**Erros possíveis:**

- `400`: Campo criador_id é obrigatório
- `500`: Título deve ter pelo menos 3 caracteres / Criador não encontrado

### **GET /api/eventos/:id**

Busca um evento específico pelo ID, incluindo dados do criador.

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "titulo": "Workshop de Node.js",
  "descricao": "Aprenda Node.js do básico ao avançado",
  "imagem_url": "https://exemplo.com/imagem.jpg",
  "criador_id": 1,
  "criador_nome": "João Silva",
  "criado_em": "2024-01-15T10:30:00.000Z"
}
```

**Erros possíveis:**

- `404`: Evento não encontrado
- `500`: ID inválido

### **PUT /api/eventos/:id**

Atualiza os dados de um evento existente.

**Body da requisição:**

```json
{
  "titulo": "Workshop Avançado de Node.js",
  "descricao": "Node.js para desenvolvedores experientes",
  "imagem_url": "https://exemplo.com/nova-imagem.jpg"
}
```

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "titulo": "Workshop Avançado de Node.js",
  "descricao": "Node.js para desenvolvedores experientes",
  "imagem_url": "https://exemplo.com/nova-imagem.jpg",
  "criador_id": 1,
  "criado_em": "2024-01-15T10:30:00.000Z"
}
```

**Erros possíveis:**

- `404`: Evento não encontrado
- `500`: Título deve ter pelo menos 3 caracteres

### **DELETE /api/eventos/:id**

Remove um evento do sistema (remove também todas as inscrições relacionadas).

**Resposta de sucesso (204):** Sem conteúdo

**Erros possíveis:**

- `404`: Evento não encontrado
- `500`: Erro interno do servidor

### **GET /api/eventos/:id/dashboard**

Retorna estatísticas e informações detalhadas sobre um evento específico.

**Resposta de sucesso (200):**

```json
{
  "evento": {
    "id": 1,
    "titulo": "Workshop de Node.js",
    "descricao": "Aprenda Node.js do básico ao avançado",
    "criador_nome": "João Silva"
  },
  "totalInscricoes": 15,
  "inscricoes": [
    {
      "nome_participante": "Ana Costa",
      "idade_participante": 25,
      "data_inscricao": "2024-01-16T09:15:00.000Z",
      "usuario_nome": "Ana Costa",
      "usuario_email": "ana@email.com"
    }
  ],
  "estatisticas": {
    "inscricoesRecentes": [
      /* últimas 5 inscrições */
    ],
    "mediaIdade": 28
  }
}
```

**Erros possíveis:**

- `404`: Evento não encontrado
- `500`: ID inválido

---

## 📝 **Endpoints de Inscrições**

### **GET /api/inscricoes**

Lista todas as inscrições cadastradas no sistema.

**Resposta de sucesso (200):**

```json
[
  {
    "id": 1,
    "evento_id": 1,
    "usuario_id": 2,
    "nome_participante": "Ana Costa",
    "idade_participante": 25,
    "data_inscricao": "2024-01-16T09:15:00.000Z"
  }
]
```

### **POST /api/inscricoes**

Cria uma nova inscrição em um evento.

**Body da requisição:**

```json
{
  "usuario_id": 2,
  "evento_id": 1,
  "nome_participante": "Carlos Mendes",
  "idade_participante": 30
}
```

**Resposta de sucesso (201):**

```json
{
  "id": 2,
  "evento_id": 1,
  "usuario_id": 2,
  "nome_participante": "Carlos Mendes",
  "idade_participante": 30,
  "data_inscricao": "2024-01-16T10:20:00.000Z"
}
```

**Erros possíveis:**

- `500`: Evento, usuário e nome do participante são obrigatórios
- `500`: Evento não encontrado
- `500`: Usuário não encontrado
- `500`: Usuário já está inscrito neste evento

### **GET /api/inscricoes/:id**

Busca uma inscrição específica pelo ID.

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "evento_id": 1,
  "usuario_id": 2,
  "nome_participante": "Ana Costa",
  "idade_participante": 25,
  "data_inscricao": "2024-01-16T09:15:00.000Z"
}
```

**Erros possíveis:**

- `404`: Inscrição não encontrada
- `500`: ID inválido

### **PUT /api/inscricoes/:id**

Atualiza os dados de uma inscrição existente.

**Body da requisição:**

```json
{
  "nome_participante": "Ana Costa Silva",
  "idade_participante": 26
}
```

**Resposta de sucesso (200):**

```json
{
  "id": 1,
  "evento_id": 1,
  "usuario_id": 2,
  "nome_participante": "Ana Costa Silva",
  "idade_participante": 26,
  "data_inscricao": "2024-01-16T09:15:00.000Z"
}
```

**Erros possíveis:**

- `404`: Inscrição não encontrada
- `500`: Nome do participante é obrigatório

### **DELETE /api/inscricoes/:id**

Remove uma inscrição do sistema.

**Resposta de sucesso (204):** Sem conteúdo

**Erros possíveis:**

- `404`: Inscrição não encontrada
- `500`: Erro interno do servidor

---

## 📊 **Códigos de Status HTTP Utilizados**

- **200 OK**: Requisição bem-sucedida (GET, PUT)
- **201 Created**: Recurso criado com sucesso (POST)
- **204 No Content**: Recurso removido com sucesso (DELETE)
- **400 Bad Request**: Dados da requisição inválidos
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

---

## 🔧 **Estrutura de Erro Padrão**

Todos os endpoints retornam erros no seguinte formato:

```json
{
  "erro": "Descrição detalhada do erro"
}
```

---

## 📋 **Validações Implementadas**

### **Usuários**

- Email deve ser único no sistema
- Todos os campos são obrigatórios na criação
- Validação de ID numérico válido

### **Eventos**

- Título deve ter pelo menos 3 caracteres
- Criador deve existir no sistema
- Criador_id é obrigatório

### **Inscrições**

- Evento e usuário devem existir
- Nome do participante é obrigatório
- Não permite inscrições duplicadas (mesmo usuário, mesmo evento)
- Idade do participante é opcional
