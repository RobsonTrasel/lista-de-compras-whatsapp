import { Request, Response } from "express";
import { prisma } from "./db";
import { sendMessage } from "./sendMessage";

export const handleAlexaRequest = async (req: Request, res: Response) => {
    try {
        const { item } = req.body;

        if (!item) {
            res.status(400).json({ message: "Item não fornecido" });
        }

        await prisma.shoppingItem.create({
            data: { item },
        });

        const messageText = await formatShoppingList();
        await sendMessage(messageText);

        res.json({ message: `${item} adicionado com sucesso à lista de compras.` });

    } catch (error) {
        console.error("Erro ao processar requisição da Alexa:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
};

const formatShoppingList = async (): Promise<string> => {
    const items = await prisma.shoppingItem.findMany({
        orderBy: { createdAt: "asc" },
    });

    return `🛒 *LISTA DE COMPRAS PARA O PRÓXIMO MÊS:*\n\n` + items.map((i: { item: string }) => `- ${i.item}`).join("\n");

};
