// models/UsuarioModel.js
const UsuarioRepository = require("../repositories/UsuarioRepository");

const UsuarioModel = {
  async listarUsuarios() {
    try {
      return await UsuarioRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  },

  async criarUsuario(nome, email, senha) {
    try {
      // Verificar se o email já existe
      const usuarioExistente = await UsuarioRepository.findByEmail(email);
      if (usuarioExistente) {
        throw new Error("Email já está em uso");
      }

      return await UsuarioRepository.create(nome, email, senha);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  },

  async buscarUsuarioPorId(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      return await UsuarioRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  },

  async editarUsuario(id, nome, email) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      // Verificar se o usuário existe
      const usuarioExiste = await UsuarioRepository.exists(id);
      if (!usuarioExiste) {
        return null;
      }

      // Verificar se o email já está sendo usado por outro usuário
      const usuarioComEmail = await UsuarioRepository.findByEmail(email);
      if (usuarioComEmail && usuarioComEmail.id != id) {
        throw new Error("Email já está em uso por outro usuário");
      }

      return await UsuarioRepository.update(id, nome, email);
    } catch (error) {
      throw new Error(`Erro ao editar usuário: ${error.message}`);
    }
  },

  async deletarUsuario(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      // Verificar se o usuário existe
      const usuarioExiste = await UsuarioRepository.exists(id);
      if (!usuarioExiste) {
        throw new Error("Usuário não encontrado");
      }

      const deletado = await UsuarioRepository.delete(id);
      if (!deletado) {
        throw new Error("Falha ao deletar usuário");
      }

      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  },

  async buscarUsuarioPorEmail(email) {
    try {
      if (!email) {
        throw new Error("Email é obrigatório");
      }

      return await UsuarioRepository.findByEmail(email);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  },
};

module.exports = UsuarioModel;
