// models/InscricaoModel.js
const pool = require("../config/db");

const InscricaoModel = {
  async listarInscricoes() {
    const result = await pool.query("SELECT * FROM inscricoes");
    return result.rows;
  },

  async criarInscricao(
    evento_id,
    usuario_id,
    nome_participante,
    idade_participante
  ) {
    const result = await pool.query(
      "INSERT INTO inscricoes (evento_id, usuario_id, nome_participante, idade_participante) VALUES ($1, $2, $3, $4) RETURNING *",
      [evento_id, usuario_id, nome_participante, idade_participante]
    );
    return result.rows[0];
  },

  async buscarInscricaoPorId(id) {
    const result = await pool.query("SELECT * FROM inscricoes WHERE id = $1", [
      id,
    ]);
    return result.rows[0]; // retorna undefined se não achar
  },

  async editarInscricao(id, nome_participante, idade_participante) {
    const result = await pool.query(
      "UPDATE inscricoes SET nome_participante = $1, idade_participante = $2 WHERE id = $3 RETURNING *",
      [nome_participante, idade_participante, id]
    );
    return result.rows[0];
  },

  async deletarInscricao(id) {
    await pool.query("DELETE FROM inscricoes WHERE id = $1", [id]);
  },
};

module.exports = InscricaoModel;
