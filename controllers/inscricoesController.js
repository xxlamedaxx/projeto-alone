// controllers/inscricoesController.js
const inscricaoService = require("../services/inscricaoService");

const inscricoesController = {
  async listarInscricoes(req, res) {
    try {
      const inscricoes = await inscricaoService.listarInscricoes();
      res.json(inscricoes);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async criarInscricao(req, res) {
    const { usuario_id, evento_id, nome_participante, idade_participante } =
      req.body;
    try {
      const novaInscricao = await inscricaoService.criarInscricao(
        evento_id,
        usuario_id,
        nome_participante,
        idade_participante
      );
      res.status(201).json(novaInscricao);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async buscarInscricaoPorId(req, res) {
    const { id } = req.params;
    try {
      const inscricao = await inscricaoService.buscarInscricaoPorId(id);
      if (!inscricao)
        return res.status(404).json({ erro: "Inscrição não encontrada" });
      res.json(inscricao);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async editarInscricao(req, res) {
    const { id } = req.params;
    const { nome_participante, idade_participante } = req.body;
    try {
      const inscricao = await inscricaoService.editarInscricao(
        id,
        nome_participante,
        idade_participante
      );
      if (!inscricao)
        return res.status(404).json({ erro: "Inscrição não encontrada" });
      res.json(inscricao);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },

  async deletarInscricao(req, res) {
    const { id } = req.params;
    try {
      await inscricaoService.deletarInscricao(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  },
};

module.exports = inscricoesController;
