// repositories/EventoRepository.js
const pool = require("../config/db");

const EventoRepository = {
  async findAll() {
    const result = await pool.query(
      `SELECT e.*, u.nome as criador_nome 
       FROM eventos e 
       LEFT JOIN usuarios u ON e.criador_id = u.id 
       ORDER BY e.criado_em DESC`
    );
    return result.rows;
  },

  async create(titulo, descricao, imagem_url, criador_id) {
    const result = await pool.query(
      "INSERT INTO eventos (titulo, descricao, imagem_url, criador_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, descricao, imagem_url, criador_id]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT e.*, u.nome as criador_nome 
       FROM eventos e 
       LEFT JOIN usuarios u ON e.criador_id = u.id 
       WHERE e.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, titulo, descricao, imagem_url) {
    const result = await pool.query(
      "UPDATE eventos SET titulo = $1, descricao = $2, imagem_url = $3 WHERE id = $4 RETURNING *",
      [titulo, descricao, imagem_url, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM eventos WHERE id = $1", [id]);
    return result.rowCount > 0;
  },

  async findInscricoesByEventoId(id) {
    const result = await pool.query(
      `SELECT i.nome_participante, i.idade_participante, i.data_inscricao, u.nome as usuario_nome, u.email as usuario_email
       FROM inscricoes i 
       LEFT JOIN usuarios u ON i.usuario_id = u.id 
       WHERE i.evento_id = $1 
       ORDER BY i.data_inscricao DESC`,
      [id]
    );
    return result.rows;
  },

  async countInscricoesByEventoId(id) {
    const result = await pool.query(
      "SELECT COUNT(*) as total FROM inscricoes WHERE evento_id = $1",
      [id]
    );
    return parseInt(result.rows[0].total);
  },

  async findByCreatorId(criador_id) {
    const result = await pool.query(
      "SELECT * FROM eventos WHERE criador_id = $1 ORDER BY criado_em DESC",
      [criador_id]
    );
    return result.rows;
  },

  async exists(id) {
    const result = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM eventos WHERE id = $1)",
      [id]
    );
    return result.rows[0].exists;
  },
};

module.exports = EventoRepository;
