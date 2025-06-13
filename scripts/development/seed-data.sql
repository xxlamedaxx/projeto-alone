
INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao.silva@email.com', '$2b$10$rOvHHw8JGKz5EY2J5F5Jx.5zQ8ZxY9mK4Z5Y8X7W6V5U4T3S2R1Q0'),
('Maria Santos', 'maria.santos@email.com', '$2b$10$rOvHHw8JGKz5EY2J5F5Jx.5zQ8ZxY9mK4Z5Y8X7W6V5U4T3S2R1Q0'),
('Pedro Oliveira', 'pedro.oliveira@email.com', '$2b$10$rOvHHw8JGKz5EY2J5F5Jx.5zQ8ZxY9mK4Z5Y8X7W6V5U4T3S2R1Q0'),
('Ana Costa', 'ana.costa@email.com', '$2b$10$rOvHHw8JGKz5EY2J5F5Jx.5zQ8ZxY9mK4Z5Y8X7W6V5U4T3S2R1Q0'),
('Carlos Ferreira', 'carlos.ferreira@email.com', '$2b$10$rOvHHw8JGKz5EY2J5F5Jx.5zQ8ZxY9mK4Z5Y8X7W6V5U4T3S2R1Q0');


INSERT INTO eventos (titulo, descricao, imagem_url, criador_id, criado_em) VALUES
('Workshop de React', 'Aprenda os fundamentos do React.js com exemplos práticos e exercícios hands-on.', 'https://via.placeholder.com/400x300/4285f4/ffffff?text=React+Workshop', 1, '2024-12-01 09:00:00'),
('Palestra sobre IA', 'Descubra as últimas tendências em Inteligência Artificial e Machine Learning.', 'https://via.placeholder.com/400x300/34a853/ffffff?text=AI+Talk', 2, '2024-12-02 14:00:00'),
('Hackathon 2024', 'Competição de programação de 48 horas com prêmios incríveis!', 'https://via.placeholder.com/400x300/ea4335/ffffff?text=Hackathon', 3, '2024-12-03 18:00:00'),
('Curso de Node.js', 'Curso completo de desenvolvimento backend com Node.js e Express.', 'https://via.placeholder.com/400x300/fbbc04/ffffff?text=Node.js+Course', 1, '2024-12-04 10:00:00'),
('Meetup de Desenvolvedores', 'Encontro mensal da comunidade de desenvolvedores da região.', 'https://via.placeholder.com/400x300/9c27b0/ffffff?text=Dev+Meetup', 4, '2024-12-05 19:00:00'),
('Workshop de UI/UX', 'Design de interfaces modernas e experiência do usuário.', 'https://via.placeholder.com/400x300/ff9800/ffffff?text=UI%2FUX+Workshop', 5, '2024-12-06 15:00:00'),
('Conferência Tech 2024', 'A maior conferência de tecnologia da região com palestrantes renomados.', 'https://via.placeholder.com/400x300/2196f3/ffffff?text=Tech+Conference', 2, '2024-12-07 08:00:00'),
('Curso de Python', 'Aprenda Python do básico ao avançado com projetos práticos.', 'https://via.placeholder.com/400x300/4caf50/ffffff?text=Python+Course', 3, '2024-12-08 13:00:00');

INSERT INTO inscricoes (evento_id, usuario_id, nome_participante, idade_participante, data_inscricao) VALUES

(1, 2, 'Maria Santos', 28, '2024-12-01 10:30:00'),
(1, 3, 'Pedro Oliveira', 32, '2024-12-01 11:15:00'),
(1, 4, 'Ana Costa', 25, '2024-12-01 12:00:00'),


(2, 1, 'João Silva', 30, '2024-12-02 09:45:00'),
(2, 3, 'Pedro Oliveira', 32, '2024-12-02 10:20:00'),
(2, 5, 'Carlos Ferreira', 27, '2024-12-02 11:30:00'),


(3, 1, 'João Silva', 30, '2024-12-03 16:00:00'),
(3, 2, 'Maria Santos', 28, '2024-12-03 16:30:00'),
(3, 4, 'Ana Costa', 25, '2024-12-03 17:00:00'),
(3, 5, 'Carlos Ferreira', 27, '2024-12-03 17:15:00'),


(4, 2, 'Maria Santos', 28, '2024-12-04 08:30:00'),
(4, 5, 'Carlos Ferreira', 27, '2024-12-04 09:00:00'),


(5, 1, 'João Silva', 30, '2024-12-05 18:00:00'),
(5, 3, 'Pedro Oliveira', 32, '2024-12-05 18:30:00'),


(6, 4, 'Ana Costa', 25, '2024-12-06 14:00:00'),
(6, 1, 'João Silva', 30, '2024-12-06 14:30:00'),


(7, 2, 'Maria Santos', 28, '2024-12-07 07:30:00'),
(7, 3, 'Pedro Oliveira', 32, '2024-12-07 07:45:00'),
(7, 4, 'Ana Costa', 25, '2024-12-07 08:00:00'),
(7, 5, 'Carlos Ferreira', 27, '2024-12-07 08:15:00'),


(8, 1, 'João Silva', 30, '2024-12-08 12:30:00'),
(8, 4, 'Ana Costa', 25, '2024-12-08 13:00:00');