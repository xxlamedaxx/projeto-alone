// repositories/InscricaoRepository.js
const pool = require("../config/db");

const InscricaoRepository = {
  async findAll() {
    const result = await pool.query("SELECT * FROM inscricoes");
    return result.rows;
  },

  async create(evento_id, usuario_id, nome_participante, idade_participante) {
    const result = await pool.query(
      "INSERT INTO inscricoes (evento_id, usuario_id, nome_participante, idade_participante) VALUES ($1, $2, $3, $4) RETURNING *",
      [evento_id, usuario_id, nome_participante, idade_participante]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM inscricoes WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },

  async exists(id) {
    const result = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM inscricoes WHERE id = $1)",
      [id]
    );
    return result.rows[0].exists;
  },

  async update(id, nome_participante, idade_participante) {
    const result = await pool.query(
      "UPDATE inscricoes SET nome_participante = $1, idade_participante = $2 WHERE id = $3 RETURNING *",
      [nome_participante, idade_participante, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM inscricoes WHERE id = $1", [
      id,
    ]);
    return result.rowCount > 0;
  },

  async findByUsuario(usuario_id) {
    const result = await pool.query(
      "SELECT * FROM inscricoes WHERE usuario_id = $1",
      [usuario_id]
    );
    return result.rows;
  },

  async findByEvento(evento_id) {
    const result = await pool.query(
      "SELECT * FROM inscricoes WHERE evento_id = $1",
      [evento_id]
    );
    return result.rows;
  },

  async findByEventoAndUsuario(evento_id, usuario_id) {
    const result = await pool.query(
      "SELECT * FROM inscricoes WHERE evento_id = $1 AND usuario_id = $2",
      [evento_id, usuario_id]
    );
    return result.rows[0];
  },
};

module.exports = InscricaoRepository;
