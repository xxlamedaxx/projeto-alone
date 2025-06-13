const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const runSeedData = async () => {
  try {
    // Primeiro, limpa os dados existentes (opcional)
    console.log("Limpando dados existentes...");
    await pool.query("TRUNCATE TABLE inscricoes RESTART IDENTITY CASCADE;");
    await pool.query("TRUNCATE TABLE eventos RESTART IDENTITY CASCADE;");
    await pool.query("TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE;");
    console.log("Dados limpos com sucesso!");

    // Executa o script de seed
    console.log("Inserindo dados fake...");
    const filePath = path.join(__dirname, "seed-data.sql");
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);
    console.log("Dados fake inseridos com sucesso!");

    // Mostra um resumo dos dados inseridos
    const usersCount = await pool.query("SELECT COUNT(*) FROM usuarios");
    const eventsCount = await pool.query("SELECT COUNT(*) FROM eventos");
    const registrationsCount = await pool.query(
      "SELECT COUNT(*) FROM inscricoes"
    );

    console.log("\n=== RESUMO DOS DADOS ===");
    console.log(`Usuários inseridos: ${usersCount.rows[0].count}`);
    console.log(`Eventos inseridos: ${eventsCount.rows[0].count}`);
    console.log(`Inscrições inseridas: ${registrationsCount.rows[0].count}`);
    console.log("=======================\n");
  } catch (err) {
    console.error("Erro ao executar o script de seed:", err);
  } finally {
    await pool.end();
  }
};

runSeedData();
