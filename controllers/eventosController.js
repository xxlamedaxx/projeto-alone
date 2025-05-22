// controllers/eventosController.js
const eventoService = require("../services/eventoService");

const eventosController = {
  async listarEventos(req, res) {
    try {
      const eventos = await eventoService.listarEventos();
      res.json(eventos);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async criarEvento(req, res) {
    const { titulo, descricao, imagem_url, criador_id } = req.body;

    if (!criador_id) {
      return res.status(400).json({ erro: "O campo criador_id é obrigatório" });
    }

    try {
      const novoEvento = await eventoService.criarEvento(
        titulo,
        descricao,
        imagem_url,
        criador_id
      );
      res.status(201).json(novoEvento);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarEventoPorId(req, res) {
    const { id } = req.params;
    try {
      const evento = await eventoService.buscarEventoPorId(id);
      if (!evento)
        return res.status(404).json({ erro: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async editarEvento(req, res) {
    const { id } = req.params;
    const { titulo, descricao, data } = req.body;
    try {
      const evento = await eventoService.editarEvento(
        id,
        titulo,
        descricao,
        data
      );
      if (!evento)
        return res.status(404).json({ erro: "Evento não encontrado" });
      res.json(evento);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletarEvento(req, res) {
    const { id } = req.params;
    try {
      await eventoService.deletarEvento(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async dashboardEvento(req, res) {
    const { id } = req.params;
    try {
      const dashboard = await eventoService.dashboardEvento(id);
      res.json(dashboard);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },
};

module.exports = eventosController;
