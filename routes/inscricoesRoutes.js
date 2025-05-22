const express = require("express");
const router = express.Router();
const inscricoesController = require("../controllers/inscricoesController");

router.post("/", inscricoesController.criarInscricao);
router.get("/", inscricoesController.listarInscricoes);
router.get("/:id", inscricoesController.buscarInscricaoPorId);
router.put("/:id", inscricoesController.editarInscricao);
router.delete("/:id", inscricoesController.deletarInscricao);

module.exports = router;
