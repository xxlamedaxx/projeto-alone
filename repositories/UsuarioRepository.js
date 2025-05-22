// repositories/UsuarioRepository.js
const pool = require("../config/db");

const UsuarioRepository = {
  async findAll() {
    const result = await pool.query("SELECT id, nome, email FROM usuarios");
    return result.rows;
  },

  async create(nome, email, senha) {
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email",
      [nome, email, senha]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query(
      "SELECT id, nome, email FROM usuarios WHERE id = $1",
      [id]
    );
    return result.rows[0];
  },

  async update(id, nome, email) {
    const result = await pool.query(
      "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING id, nome, email",
      [nome, email, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    return result.rowCount > 0;
  },

  async findByEmail(email) {
    const result = await pool.query(
      "SELECT id, nome, email, senha FROM usuarios WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  async exists(id) {
    const result = await pool.query(
      "SELECT EXISTS(SELECT 1 FROM usuarios WHERE id = $1)",
      [id]
    );
    return result.rows[0].exists;
  },
};

module.exports = UsuarioRepository;
