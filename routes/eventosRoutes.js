const express = require("express");
const router = express.Router();
const eventosController = require("../controllers/eventosController");

router.post("/", eventosController.criarEvento);
router.get("/", eventosController.listarEventos);
router.get("/:id", eventosController.buscarEventoPorId);
router.put("/:id", eventosController.editarEvento);
router.delete("/:id", eventosController.deletarEvento);
router.get("/:id/dashboard", eventosController.dashboardEvento);

module.exports = router;
