// services/inscricaoService.js
const InscricaoModel = require("../models/InscricaoModel");

const inscricaoService = {
  async listarInscricoes() {
    return await InscricaoModel.listarInscricoes();
  },

  async criarInscricao(
    evento_id,
    usuario_id,
    nome_participante,
    idade_participante
  ) {
    return await InscricaoModel.criarInscricao(
      evento_id,
      usuario_id,
      nome_participante,
      idade_participante
    );
  },

  async buscarInscricaoPorId(id) {
    return await InscricaoModel.buscarInscricaoPorId(id);
  },

  async editarInscricao(id, nome_participante, idade_participante) {
    return await InscricaoModel.editarInscricao(
      id,
      nome_participante,
      idade_participante
    );
  },

  async deletarInscricao(id) {
    return await InscricaoModel.deletarInscricao(id);
  },
};

module.exports = inscricaoService;
