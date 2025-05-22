// services/eventoService.js
const EventoModel = require("../models/EventoModel");

const eventoService = {
  async listarEventos() {
    return await EventoModel.listarEventos();
  },

  async criarEvento(titulo, descricao, imagem_url, criador_id) {
    return await EventoModel.criarEvento(
      titulo,
      descricao,
      imagem_url,
      criador_id
    );
  },
  async buscarEventoPorId(id) {
    return await EventoModel.buscarEventoPorId(id);
  },

  async editarEvento(id, titulo, descricao, data) {
    return await EventoModel.editarEvento(id, titulo, descricao, data);
  },

  async deletarEvento(id) {
    return await EventoModel.deletarEvento(id);
  },

  async dashboardEvento(id) {
    return await EventoModel.dashboardEvento(id);
  },
};

module.exports = eventoService;
