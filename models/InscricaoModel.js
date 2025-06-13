// models/InscricaoModel.js
const InscricaoRepository = require("../repositories/InscricaoRepository");

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
      // Validações básicas
      if (!evento_id || isNaN(evento_id)) {
        throw new Error("ID do evento inválido");
      }
      if (!usuario_id || isNaN(usuario_id)) {
        throw new Error("ID do usuário inválido");
      }
      if (!nome_participante || nome_participante.trim() === "") {
        throw new Error("Nome do participante é obrigatório");
      }
      if (
        !idade_participante ||
        isNaN(idade_participante) ||
        idade_participante <= 0
      ) {
        throw new Error(
          "Idade do participante deve ser um número válido e maior que zero"
        );
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
      if (!nome_participante || nome_participante.trim() === "") {
        throw new Error("Nome do participante é obrigatório");
      }
      if (
        !idade_participante ||
        isNaN(idade_participante) ||
        idade_participante <= 0
      ) {
        throw new Error(
          "Idade do participante deve ser um número válido e maior que zero"
        );
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

  async buscarInscricoesPorUsuario(usuario_id) {
    try {
      if (!usuario_id || isNaN(usuario_id)) {
        throw new Error("ID do usuário inválido");
      }

      return await InscricaoRepository.findByUsuario(usuario_id);
    } catch (error) {
      throw new Error(`Erro ao buscar inscrições do usuário: ${error.message}`);
    }
  },

  async buscarInscricoesPorEvento(evento_id) {
    try {
      if (!evento_id || isNaN(evento_id)) {
        throw new Error("ID do evento inválido");
      }

      return await InscricaoRepository.findByEvento(evento_id);
    } catch (error) {
      throw new Error(`Erro ao buscar inscrições do evento: ${error.message}`);
    }
  },
};

module.exports = InscricaoModel;
