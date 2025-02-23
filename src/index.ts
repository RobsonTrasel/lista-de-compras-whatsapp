import express, { json } from "express";
import dotenv from "dotenv";
import { handleAlexaRequest } from "./alexa";
import { prisma } from "./db";

dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 3000;

prisma.$connect()
    .then(() => console.log("✅ Conectado ao PostgreSQL"))
    .catch((err) => console.error("❌ Erro ao conectar ao PostgreSQL:", err));

// Rota para a Alexa
app.post("/alexa/shopping-list", handleAlexaRequest);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
