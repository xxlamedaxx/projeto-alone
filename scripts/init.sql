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
