// services/eventoService.js
const EventoModel = require("../models/EventoModel");

const eventoService = {
  async listarEventos() {
    try {
      return await EventoModel.listarEventos();
    } catch (error) {
      throw new Error(`Erro no serviço ao listar eventos: ${error.message}`);
    }
  },

  async criarEvento(titulo, descricao, imagem_url, criador_id) {
    try {
      // Validações de negócio adicionais podem ser feitas aqui
      if (!titulo || titulo.trim().length < 3) {
        throw new Error("Título deve ter pelo menos 3 caracteres");
      }

      if (!criador_id) {
        throw new Error("Criador é obrigatório");
      }

      return await EventoModel.criarEvento(
        titulo.trim(),
        descricao?.trim(),
        imagem_url,
        criador_id
      );
    } catch (error) {
      throw new Error(`Erro no serviço ao criar evento: ${error.message}`);
    }
  },

  async buscarEventoPorId(id) {
    try {
      const evento = await EventoModel.buscarEventoPorId(id);
      if (!evento) {
        throw new Error("Evento não encontrado");
      }
      return evento;
    } catch (error) {
      throw new Error(`Erro no serviço ao buscar evento: ${error.message}`);
    }
  },

  async editarEvento(id, titulo, descricao, imagem_url) {
    try {
      // Validações de negócio
      if (titulo && titulo.trim().length < 3) {
        throw new Error("Título deve ter pelo menos 3 caracteres");
      }

      const evento = await EventoModel.editarEvento(
        id,
        titulo?.trim(),
        descricao?.trim(),
        imagem_url
      );
      if (!evento) {
        throw new Error("Evento não encontrado");
      }
      return evento;
    } catch (error) {
      throw new Error(`Erro no serviço ao editar evento: ${error.message}`);
    }
  },

  async deletarEvento(id) {
    try {
      return await EventoModel.deletarEvento(id);
    } catch (error) {
      throw new Error(`Erro no serviço ao deletar evento: ${error.message}`);
    }
  },

  async dashboardEvento(id) {
    try {
      return await EventoModel.dashboardEvento(id);
    } catch (error) {
      throw new Error(`Erro no serviço ao gerar dashboard: ${error.message}`);
    }
  },

  async buscarEventosPorCriador(criador_id) {
    try {
      return await EventoModel.buscarEventosPorCriador(criador_id);
    } catch (error) {
      throw new Error(
        `Erro no serviço ao buscar eventos por criador: ${error.message}`
      );
    }
  },

  async validarProprietario(evento_id, usuario_id) {
    try {
      const evento = await EventoModel.buscarEventoPorId(evento_id);
      if (!evento) {
        throw new Error("Evento não encontrado");
      }

      return evento.criador_id === parseInt(usuario_id);
    } catch (error) {
      throw new Error(
        `Erro no serviço ao validar proprietário: ${error.message}`
      );
    }
  },
};

module.exports = eventoService;
