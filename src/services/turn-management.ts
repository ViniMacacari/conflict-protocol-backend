import { Database } from '../database/db.js'

export class TurnService {
    private db: Database = new Database()

    async turn(roomId: number): Promise<void> {
        if (!roomId) {
            throw new Error('ID da sala é obrigatório.')
        }

        const sql = 'CALL iniciar_turno($1)'
        await this.db.exec(sql, [roomId])
    }

    async hasOngoingTurn(roomId: number): Promise<boolean> {
        if (!roomId) {
            throw new Error('ID da sala é obrigatório.')
        }

        const sql = `
          SELECT 1 FROM salas_turnos
          WHERE id_sala = $1 AND status_turno = 'em_andamento'
          LIMIT 1
        `

        const result = await this.db.exec(sql, [roomId])
        return result.length > 0
    }
}