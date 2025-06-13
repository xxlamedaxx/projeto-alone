const Joi = require("joi");

const eventoSchema = Joi.object({
  titulo: Joi.string().min(3).max(255).required().messages({
    "string.base": "Título deve ser uma string.",
    "string.empty": "Título não pode ser vazio.",
    "string.min": "Título deve ter no mínimo {#limit} caracteres.",
    "string.max": "Título deve ter no máximo {#limit} caracteres.",
    "any.required": "Título é obrigatório.",
  }),
  descricao: Joi.string().allow("").max(1000).messages({
    "string.base": "Descrição deve ser uma string.",
    "string.max": "Descrição deve ter no máximo {#limit} caracteres.",
  }),
  imagem_url: Joi.string().uri().allow("").messages({
    "string.base": "URL da imagem deve ser uma string.",
    "string.uri": "URL da imagem deve ser uma URL válida.",
  }),
  criador_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID do criador deve ser um número.",
    "number.integer": "ID do criador deve ser um número inteiro.",
    "number.positive": "ID do criador deve ser um número positivo.",
    "any.required": "ID do criador é obrigatório.",
  }),
});

const eventoUpdateSchema = Joi.object({
  titulo: Joi.string().min(3).max(255).messages({
    "string.base": "Título deve ser uma string.",
    "string.empty": "Título não pode ser vazio.",
    "string.min": "Título deve ter no mínimo {#limit} caracteres.",
    "string.max": "Título deve ter no máximo {#limit} caracteres.",
  }),
  descricao: Joi.string().allow("").max(1000).messages({
    "string.base": "Descrição deve ser uma string.",
    "string.max": "Descrição deve ter no máximo {#limit} caracteres.",
  }),
  imagem_url: Joi.string().uri().allow("").messages({
    "string.base": "URL da imagem deve ser uma string.",
    "string.uri": "URL da imagem deve ser uma URL válida.",
  }),
}).or("titulo", "descricao", "imagem_url");

const idSchema = Joi.number().integer().positive().required().messages({
  "number.base": "ID deve ser um número.",
  "number.integer": "ID deve ser um número inteiro.",
  "number.positive": "ID deve ser um número positivo.",
  "any.required": "ID é obrigatório.",
});

const EventoRepository = require("../repositories/EventoRepository");
const UsuarioRepository = require("../repositories/UsuarioRepository");

const EventoModel = {
  async listarEventos() {
    try {
      return await EventoRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao listar eventos: ${error.message}`);
    }
  },

  async criarEvento(titulo, descricao, imagem_url, criador_id) {
    try {
      const { error } = eventoSchema.validate({
        titulo,
        descricao,
        imagem_url,
        criador_id,
      });
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Verificar se o criador existe
      const criadorExiste = await UsuarioRepository.exists(criador_id);
      if (!criadorExiste) {
        throw new Error("Criador não encontrado");
      }

      return await EventoRepository.create(
        titulo,
        descricao,
        imagem_url,
        criador_id
      );
    } catch (error) {
      throw new Error(`Erro ao criar evento: ${error.message}`);
    }
  },

  async buscarEventoPorId(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await EventoRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar evento: ${error.message}`);
    }
  },

  async editarEvento(id, titulo, descricao, imagem_url) {
    try {
      const { error: idError } = idSchema.validate(id);
      if (idError) {
        throw new Error(idError.details[0].message);
      }

      const { error: updateError } = eventoUpdateSchema.validate({
        titulo,
        descricao,
        imagem_url,
      });
      if (updateError) {
        throw new Error(updateError.details[0].message);
      }

      // Verificar se o evento existe
      const eventoExiste = await EventoRepository.exists(id);
      if (!eventoExiste) {
        return null;
      }

      return await EventoRepository.update(id, titulo, descricao, imagem_url);
    } catch (error) {
      throw new Error(`Erro ao editar evento: ${error.message}`);
    }
  },

  async deletarEvento(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Verificar se o evento existe
      const eventoExiste = await EventoRepository.exists(id);
      if (!eventoExiste) {
        throw new Error("Evento não encontrado");
      }

      const deletado = await EventoRepository.delete(id);
      if (!deletado) {
        throw new Error("Falha ao deletar evento");
      }

      return true;
    } catch (error) {
      throw new Error(`Erro ao deletar evento: ${error.message}`);
    }
  },

  async buscarInscricoesDoEvento(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Verificar se o evento existe
      const eventoExiste = await EventoRepository.exists(id);
      if (!eventoExiste) {
        throw new Error("Evento não encontrado");
      }

      return await EventoRepository.findInscricoesByEventoId(id);
    } catch (error) {
      throw new Error(`Erro ao buscar inscrições do evento: ${error.message}`);
    }
  },

  async dashboardEvento(id) {
    try {
      const { error } = idSchema.validate(id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Buscar informações do evento
      const evento = await EventoRepository.findById(id);
      if (!evento) {
        throw new Error("Evento não encontrado");
      }

      // Buscar estatísticas
      const totalInscricoes = await EventoRepository.countInscricoesByEventoId(
        id
      );
      const inscricoes = await EventoRepository.findInscricoesByEventoId(id);

      return {
        evento,
        totalInscricoes,
        inscricoes,
        estatisticas: {
          inscricoesRecentes: inscricoes.slice(0, 5), // Últimas 5 inscrições
          mediaIdade:
            inscricoes.length > 0
              ? Math.round(
                  inscricoes.reduce(
                    (acc, insc) => acc + (insc.idade_participante || 0),
                    0
                  ) / inscricoes.length
                )
              : 0,
        },
      };
    } catch (error) {
      throw new Error(`Erro ao gerar dashboard do evento: ${error.message}`);
    }
  },

  async buscarEventosPorCriador(criador_id) {
    try {
      const { error } = idSchema.validate(criador_id);
      if (error) {
        throw new Error(error.details[0].message);
      }

      return await EventoRepository.findByCreatorId(criador_id);
    } catch (error) {
      throw new Error(`Erro ao buscar eventos por criador: ${error.message}`);
    }
  },
};

module.exports = EventoModel;
