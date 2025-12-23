const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// --- ENDPOINT: Seed Data ---
// Changed .post to .get so it works in the browser
app.get('/seed', async (req, res) => { 
    await prisma.user.createMany({
        data: [
            { id: 1, name: "Alice", balance: 500.00 },
            { id: 2, name: "Bob", balance: 100.00 }
        ]
    });
    res.json({ message: "Test users created: Alice (ID: 1) and Bob (ID: 2)" });
});

// --- ENDPOINT: Transfer Funds ---
app.post('/transfer', async (req, res) => {
    const { senderId, receiverId, amount } = req.body;

    try {
        /** 
         * AI-GENERATED BOILERPLATE: DATABASE TRANSACTION
         * Ensures atomicity (Both debit and credit succeed or both fail)
         */
        const result = await prisma.$transaction(async (tx) => {
            // 1. Check & Deduct sender balance
            const sender = await tx.user.update({
                where: { id: parseInt(senderId) },
                data: { balance: { decrement: parseFloat(amount) } },
            });

            if (sender.balance < 0) {
                throw new Error("Insufficient funds for transfer.");
            }

            // 2. Credit receiver balance
            await tx.user.update({
                where: { id: parseInt(receiverId) },
                data: { balance: { increment: parseFloat(amount) } },
            });

            // 3. Create Mandatory Audit Log
            const log = await tx.auditLog.create({
                data: {
                    senderId: parseInt(senderId),
                    receiverId: parseInt(receiverId),
                    amount: parseFloat(amount),
                    status: "SUCCESS"
                },
            });

            return { senderBalance: sender.balance, log };
        });

        res.json({ message: "Transfer successful", data: result });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- ENDPOINT: Audit Log Read API ---
app.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
    const history = await prisma.auditLog.findMany({
        where: {
            OR: [
                { senderId: parseInt(userId) },
                { receiverId: parseInt(userId) }
            ]
        },
        orderBy: { timestamp: 'desc' }
    });
    res.json(history);
});

// --- ENDPOINT: Fetch All Users (for Frontend view) ---
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});