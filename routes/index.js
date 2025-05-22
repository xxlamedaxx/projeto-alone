const express = require("express");
const router = express.Router();

// Controllers
const usuariosController = require("../controllers/usuariosController.js");
const eventosController = require("../controllers/eventosController.js");
const inscricoesController = require("../controllers/inscricoesController.js");

// ===== USUÁRIOS ===== //
router.post("/usuarios", usuariosController.criarUsuario); // CREATE
router.get("/usuarios", usuariosController.listarUsuarios); // READ ALL
router.get("/usuarios/:id", usuariosController.buscarUsuarioPorId); // READ ONE
router.put("/usuarios/:id", usuariosController.editarUsuario); // UPDATE
router.delete("/usuarios/:id", usuariosController.deletarUsuario); // DELETE

// ===== EVENTOS ===== //
router.post("/eventos", eventosController.criarEvento); // CREATE
router.get("/eventos", eventosController.listarEventos); // READ ALL
router.get("/eventos/:id", eventosController.buscarEventoPorId); // READ ONE
router.put("/eventos/:id", eventosController.editarEvento); // UPDATE
router.delete("/eventos/:id", eventosController.deletarEvento); // DELETE
router.get("/eventos/:id/dashboard", eventosController.dashboardEvento); // DASHBOARD

// ===== INSCRIÇÕES ===== //
router.post("/inscricoes", inscricoesController.criarInscricao); // CREATE
router.get("/inscricoes", inscricoesController.listarInscricoes); // READ ALL
router.get("/inscricoes/:id", inscricoesController.buscarInscricaoPorId); // READ ONE
router.put("/inscricoes/:id", inscricoesController.editarInscricao); // UPDATE
router.delete("/inscricoes/:id", inscricoesController.deletarInscricao); // DELETE

module.exports = router;
