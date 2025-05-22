// models/EventoModel.js
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
      if (!titulo || !criador_id) {
        throw new Error("Título e criador são obrigatórios");
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
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      return await EventoRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar evento: ${error.message}`);
    }
  },

  async editarEvento(id, titulo, descricao, imagem_url) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
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
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
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
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
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
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
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
      if (!criador_id || isNaN(criador_id)) {
        throw new Error("ID do criador inválido");
      }

      return await EventoRepository.findByCreatorId(criador_id);
    } catch (error) {
      throw new Error(`Erro ao buscar eventos por criador: ${error.message}`);
    }
  },
};

module.exports = EventoModel;
