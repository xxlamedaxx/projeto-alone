require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const db = require("./config/db");

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'views'
app.use(express.static(path.join(__dirname, "views")));

// Rota raiz para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Usando as rotas da API
app.use("/api", routes);

// Conexão com o banco de dados e inicialização do servidor
console.log("Conectando ao banco de dados...");
db.connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
