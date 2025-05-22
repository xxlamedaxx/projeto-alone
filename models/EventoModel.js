// models/EventoModel.js
const pool = require("../config/db");

const EventoModel = {
  async listarEventos() {
    const result = await pool.query("SELECT * FROM eventos");
    return result.rows;
  },

  async criarEvento(titulo, descricao, imagem_url, criador_id) {
    const result = await pool.query(
      "INSERT INTO eventos (titulo, descricao, imagem_url, criador_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, descricao, imagem_url, criador_id]
    );
    return result.rows[0];
  },

  async buscarEventoPorId(id) {
    const result = await pool.query("SELECT * FROM eventos WHERE id = $1", [
      id,
    ]);
    return result.rows[0]; // retorna undefined se não encontrar
  },

  async editarEvento(id, titulo, descricao, imagem_url) {
    const result = await pool.query(
      "UPDATE eventos SET titulo = $1, descricao = $2, imagem_url = $3 WHERE id = $4 RETURNING *",
      [titulo, descricao, imagem_url, id]
    );
    return result.rows[0];
  },

  async deletarEvento(id) {
    await pool.query("DELETE FROM eventos WHERE id = $1", [id]);
  },

  async buscarInscricoesDoEvento(id) {
    const result = await pool.query(
      "SELECT nome_participante, idade_participante FROM inscricoes WHERE evento_id = $1",
      [id]
    );
    return result.rows;
  },
};

module.exports = EventoModel;
