const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.post("/", usuariosController.criarUsuario);
router.get("/", usuariosController.listarUsuarios);
router.get("/:id", usuariosController.buscarUsuarioPorId);
router.put("/:id", usuariosController.editarUsuario);
router.delete("/:id", usuariosController.deletarUsuario);

module.exports = router;
