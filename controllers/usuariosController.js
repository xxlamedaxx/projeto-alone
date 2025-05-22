// controllers/usuariosController.js
const usuarioService = require("../services/usuarioService");

const usuariosController = {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.listarUsuarios();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async criarUsuario(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const novoUsuario = await usuarioService.criarUsuario(nome, email, senha);
      res.status(201).json(novoUsuario);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.buscarUsuarioPorId(id);
      if (!usuario)
        return res.status(404).json({ erro: "Usuário não encontrado" });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async editarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const usuario = await usuarioService.editarUsuario(id, nome, email);
      if (!usuario)
        return res.status(404).json({ erro: "Usuário não encontrado" });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletarUsuario(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },
};

module.exports = usuariosController;
