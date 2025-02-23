import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const BASE_URL = process.env.BASE_URL;

const NUMBER = "120363406371105672";

export const sendMessage = async (message: string) => {
    try {
        const payload = { number: NUMBER, text: message };
        const url = `${BASE_URL}/message/sendText/${encodeURIComponent('Whatsapp ')}`;
        console.log(url)

        const response = await axios.post(url, payload, { headers: { "Content-Type": "application/json", "apiKey": `${process.env.API_KEY}`} });

        console.log("✅ Mensagem enviada:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Erro ao enviar mensagem:", error);
        throw error;
    }
};