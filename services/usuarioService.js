// services/usuarioService.js
const UsuarioModel = require("../models/UsuarioModel");

const usuarioService = {
  async listarUsuarios() {
    return await UsuarioModel.listarUsuarios();
  },

  async criarUsuario(nome, email, senha) {
    return await UsuarioModel.criarUsuario(nome, email, senha);
  },

  async buscarUsuarioPorId(id) {
    return await UsuarioModel.buscarUsuarioPorId(id);
  },

  async editarUsuario(id, nome, email) {
    return await UsuarioModel.editarUsuario(id, nome, email);
  },

  async deletarUsuario(id) {
    return await UsuarioModel.deletarUsuario(id);
  },
};

module.exports = usuarioService;
