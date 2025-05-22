// models/InscricaoModel.js
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
      if (!evento_id || !usuario_id || !nome_participante) {
        throw new Error(
          "Evento, usuário e nome do participante são obrigatórios"
        );
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

      // Verificar se já existe inscrição para este usuário neste evento
      const inscricaoExistente =
        await InscricaoRepository.checkExistingInscricao(evento_id, usuario_id);
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
      throw new Error(`Erro ao criar inscrição: ${error.message}`);
    }
  },

  async buscarInscricaoPorId(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      return await InscricaoRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar inscrição: ${error.message}`);
    }
  },

  async editarInscricao(id, nome_participante, idade_participante) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
      }

      if (!nome_participante) {
        throw new Error("Nome do participante é obrigatório");
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
      throw new Error(`Erro ao editar inscrição: ${error.message}`);
    }
  },

  async deletarInscricao(id) {
    try {
      if (!id || isNaN(id)) {
        throw new Error("ID inválido");
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
      throw new Error(`Erro ao deletar inscrição: ${error.message}`);
    }
  },

  async buscarInscricoesPorEvento(evento_id) {
    try {
      if (!evento_id || isNaN(evento_id)) {
        throw new Error("ID do evento inválido");
      }

      // Verificar se o evento existe
      const eventoExiste = await EventoRepository.exists(evento_id);
      if (!eventoExiste) {
        throw new Error("Evento não encontrado");
      }

      return await InscricaoRepository.findByEventoId(evento_id);
    } catch (error) {
      throw new Error(`Erro ao buscar inscrições por evento: ${error.message}`);
    }
  },

  async buscarInscricoesPorUsuario(usuario_id) {
    try {
      if (!usuario_id || isNaN(usuario_id)) {
        throw new Error("ID do usuário inválido");
      }

      // Verificar se o usuário existe
      const usuarioExiste = await UsuarioRepository.exists(usuario_id);
      if (!usuarioExiste) {
        throw new Error("Usuário não encontrado");
      }

      return await InscricaoRepository.findByUsuarioId(usuario_id);
    } catch (error) {
      throw new Error(
        `Erro ao buscar inscrições por usuário: ${error.message}`
      );
    }
  },

  async contarInscricoesPorEvento(evento_id) {
    try {
      if (!evento_id || isNaN(evento_id)) {
        throw new Error("ID do evento inválido");
      }

      return await InscricaoRepository.countByEventoId(evento_id);
    } catch (error) {
      throw new Error(`Erro ao contar inscrições: ${error.message}`);
    }
  },
};

module.exports = InscricaoModel;
