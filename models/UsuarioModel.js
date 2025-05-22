// models/UsuarioModel.js
const pool = require("../config/db");

const UsuarioModel = {
  async listarUsuarios() {
    const result = await pool.query("SELECT id, nome, email FROM usuarios");
    return result.rows;
  },

  async criarUsuario(nome, email, senha) {
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, senha]
    );
    return result.rows[0];
  },

  async buscarUsuarioPorId(id) {
    const result = await pool.query(
      "SELECT id, nome, email FROM usuarios WHERE id = $1",
      [id]
    );
    return result.rows[0]; // ou undefined se não encontrar
  },

  async editarUsuario(id, nome, email) {
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email",
      [nome, email, id]
    );
    return result.rows[0];
  },

  async deletarUsuario(id) {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
  },
};

module.exports = UsuarioModel;
