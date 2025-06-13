const Joi = require("joi");

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    "string.base": "Nome deve ser uma string.",
    "string.empty": "Nome não pode ser vazio.",
    "string.min": "Nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "Nome deve ter no máximo {#limit} caracteres.",
    "any.required": "Nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email deve ser uma string.",
    "string.empty": "Email não pode ser vazio.",
    "string.email": "Email deve ser um email válido.",
    "any.required": "Email é obrigatório.",
  }),
  senha: Joi.string().min(6).required().messages({
    "string.base": "Senha deve ser uma string.",
    "string.empty": "Senha não pode ser vazia.",
    "string.min": "Senha deve ter no mínimo {#limit} caracteres.",
    "any.required": "Senha é obrigatória.",
  }),
});

const usuarioUpdateSchema = Joi.object({
  nome: Joi.string().min(3).max(100).messages({
    "string.base": "Nome deve ser uma string.",
    "string.empty": "Nome não pode ser vazio.",
    "string.min": "Nome deve ter no mínimo {#limit} caracteres.",
    "string.max": "Nome deve ter no máximo {#limit} caracteres.",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email deve ser uma string.",
    "string.empty": "Email não pode ser vazio.",
    "string.email": "Email deve ser um email válido.",
  }),
}).or("nome", "email"); // Pelo menos um dos campos deve estar presente para atualização

const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "ID deve ser um número.",
  "number.integer": "ID deve ser um número inteiro.",
  "number.positive": "ID deve ser um número positivo.",
  "any.required": "ID é obrigatório.",
});

const emailSchema = Joi.string().email().required().messages({
  "string.base": "Email deve ser uma string.",
  "string.empty": "Email não pode ser vazio.",
  "string.email": "Email deve ser um email válido.",
  "any.required": "Email é obrigatório.",
});

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
      const { error } = usuarioSchema.validate({ nome, email, senha });
      if (error) {
        throw new Error(error.details[0].message);
      }

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
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await UsuarioRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  },

  async editarUsuario(id, nome, email) {
    try {
      const { error: idError } = idSchema.validate(id);
      if (idError) {
        throw new Error(idError.details[0].message);
      }

      const { error: updateError } = usuarioUpdateSchema.validate({
        nome,
        email,
      });
      if (updateError) {
        throw new Error(updateError.details[0].message);
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
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
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
      const { error } = emailSchema.validate(email);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await UsuarioRepository.findByEmail(email);
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  },
};

module.exports = UsuarioModel;
