const fs = require("fs");
const path = require("path");
const db = require("./config/db");

const migrationsDir = path.join(__dirname, "scripts");
const files = fs.readdirSync(migrationsDir).sort();

(async () => {
  try {
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      console.log(`🔄 Executando: ${file}`);

      if (file.endsWith(".sql")) {
        const sql = fs.readFileSync(filePath, "utf8");
        await db.query(sql);
      } else if (file.endsWith(".js")) {
        const migrationScript = require(filePath);
        if (typeof migrationScript === "function") {
          await migrationScript(db);
        }
      }
      // Arquivos com outras extensões serão ignorados silenciosamente
    }

    console.log("✅ Todas as migrações foram aplicadas com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao executar migração:", error.message);
    process.exit(1);
  }
})();
