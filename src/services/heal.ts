import { Database } from '../database/db.js'

interface HealData {
    roomCode: number
    targetId: number
    amount: number
}

export class HealService {
    private db = new Database()

    async heal(data: HealData): Promise<void> {
        const { roomCode, targetId, amount } = data

        if (!roomCode || !targetId || !amount || amount <= 0) {
            throw new Error('Todos os campos são obrigatórios e a cura deve ser positiva.')
        }

        await this.db.exec('CALL curar_jogador($1, $2, $3)', [
            roomCode,
            targetId,
            amount
        ])
    }
}