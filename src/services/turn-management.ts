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
}