const express = require("express");
const router = express.Router();

const usuariosRoutes = require("./usuariosRoutes");
const eventosRoutes = require("./eventosRoutes");
const inscricoesRoutes = require("./inscricoesRoutes");

router.use("/usuarios", usuariosRoutes);
router.use("/eventos", eventosRoutes);
router.use("/inscricoes", inscricoesRoutes);

module.exports = router;
