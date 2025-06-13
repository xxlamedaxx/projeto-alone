const Joi = require("joi");

const inscricaoSchema = Joi.object({
  evento_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID do evento deve ser um número.",
    "number.integer": "ID do evento deve ser um número inteiro.",
    "number.positive": "ID do evento deve ser um número positivo.",
    "any.required": "ID do evento é obrigatório.",
  }),
  usuario_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID do usuário deve ser um número.",
    "number.integer": "ID do usuário deve ser um número inteiro.",
    "number.positive": "ID do usuário deve ser um número positivo.",
    "any.required": "ID do usuário é obrigatório.",
  }),
  nome_participante: Joi.string().min(3).max(100).required().messages({
    "string.base": "Nome do participante deve ser uma string.",
    "string.empty": "Nome do participante não pode ser vazio.",
    "string.min":
      "Nome do participante deve ter no mínimo {#limit} caracteres.",
    "string.max":
      "Nome do participante deve ter no máximo {#limit} caracteres.",
    "any.required": "Nome do participante é obrigatório.",
  }),
  idade_participante: Joi.number().integer().positive().required().messages({
    "number.base": "Idade do participante deve ser um número.",
    "number.integer": "Idade do participante deve ser um número inteiro.",
    "number.positive": "Idade do participante deve ser um número positivo.",
    "any.required": "Idade do participante é obrigatória.",
  }),
});

const inscricaoUpdateSchema = Joi.object({
  nome_participante: Joi.string().min(3).max(100).messages({
    "string.base": "Nome do participante deve ser uma string.",
    "string.empty": "Nome do participante não pode ser vazio.",
    "string.min":
      "Nome do participante deve ter no mínimo {#limit} caracteres.",
    "string.max":
      "Nome do participante deve ter no máximo {#limit} caracteres.",
  }),
  idade_participante: Joi.number().integer().positive().messages({
    "number.base": "Idade do participante deve ser um número.",
    "number.integer": "Idade do participante deve ser um número inteiro.",
    "number.positive": "Idade do participante deve ser um número positivo.",
  }),
}).or("nome_participante", "idade_participante");

const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "ID deve ser um número.",
  "number.integer": "ID deve ser um número inteiro.",
  "number.positive": "ID deve ser um número positivo.",
  "any.required": "ID é obrigatório.",
});

const InscricaoRepository = require("../repositories/InscricaoRepository");
const EventoRepository = require("../repositories/EventoRepository");
const UsuarioRepository = require("../repositories/UsuarioRepository");

const InscricaoModel = {
  async listarInscricoes() {
    try {
      return await InscricaoRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao listar inscrições: ${error.message}`);
    }
  },

  async criarInscricao(
    evento_id,
    usuario_id,
    nome_participante,
    idade_participante
  ) {
    try {
      const { error } = inscricaoSchema.validate({
        evento_id,
        usuario_id,
        nome_participante,
        idade_participante,
      });
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Verificar se o evento existe
      const eventoExiste = await EventoRepository.exists(evento_id);
      if (!eventoExiste) {
        throw new Error("Evento não encontrado");
      }

      // Verificar se o usuário existe
      const usuarioExiste = await UsuarioRepository.exists(usuario_id);
      if (!usuarioExiste) {
        throw new Error("Usuário não encontrado");
      }

      // Verificar se já existe inscrição do usuário para o evento
      const inscricaoExistente =
        await InscricaoRepository.findByEventoAndUsuario(evento_id, usuario_id);
      if (inscricaoExistente) {
        throw new Error("Usuário já está inscrito neste evento");
      }

      return await InscricaoRepository.create(
        evento_id,
        usuario_id,
        nome_participante,
        idade_participante
      );
    } catch (error) {
      // Não envolver erros de validação Joi em uma mensagem genérica
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(`Erro ao criar inscrição: ${error.message}`);
      }
    }
  },

  async buscarInscricaoPorId(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await InscricaoRepository.findById(id);
    } catch (error) {
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(`Erro ao buscar inscrição: ${error.message}`);
      }
    }
  },

  async editarInscricao(id, nome_participante, idade_participante) {
    try {
      const { error: idError } = idSchema.validate(id);
      if (idError) {
        throw new Error(idError.details[0].message);
      }

      const { error: updateError } = inscricaoUpdateSchema.validate({
        nome_participante,
        idade_participante,
      });
      if (updateError) {
        throw new Error(updateError.details[0].message);
      }

      // Verificar se a inscrição existe
      const inscricaoExiste = await InscricaoRepository.exists(id);
      if (!inscricaoExiste) {
        return null;
      }

      return await InscricaoRepository.update(
        id,
        nome_participante,
        idade_participante
      );
    } catch (error) {
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(`Erro ao editar inscrição: ${error.message}`);
      }
    }
  },

  async deletarInscricao(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Verificar se a inscrição existe
      const inscricaoExiste = await InscricaoRepository.exists(id);
      if (!inscricaoExiste) {
        throw new Error("Inscrição não encontrada");
      }

      const deletado = await InscricaoRepository.delete(id);
      if (!deletado) {
        throw new Error("Falha ao deletar inscrição");
      }

      return true;
    } catch (error) {
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(`Erro ao deletar inscrição: ${error.message}`);
      }
    }
  },

  async buscarInscricoesPorUsuario(usuario_id) {
    try {
      const { error } = idSchema.validate(usuario_id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await InscricaoRepository.findByUsuario(usuario_id);
    } catch (error) {
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(
          `Erro ao buscar inscrições do usuário: ${error.message}`
        );
      }
    }
  },

  async buscarInscricoesPorEvento(evento_id) {
    try {
      const { error } = idSchema.validate(evento_id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await InscricaoRepository.findByEvento(evento_id);
    } catch (error) {
      if (error.message.includes("validation error")) {
        throw error;
      } else {
        throw new Error(
          `Erro ao buscar inscrições do evento: ${error.message}`
        );
      }
    }
  },
};

module.exports = InscricaoModel;
