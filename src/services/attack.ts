import { Database } from '../database/db.js'

interface AttackData {
    roomCode: number
    targetId: number
    damage: number
}

export class AttackService {
    private db = new Database()

    async attack(data: AttackData): Promise<void> {
        const { roomCode, targetId, damage } = data

        if (!roomCode || !targetId || !damage || damage <= 0) {
            throw new Error('Todos os campos são obrigatórios e o dano deve ser positivo.')
        }

        await this.db.exec('CALL atacar_jogador($1, $2, $3)', [
            roomCode,
            targetId,
            damage
        ])
    }
}