import { Database } from '../database/db.js'

export class SortPlayersService {
    private db: Database = new Database()

    async sort(roomId: number): Promise<any> {
        try {
            if (!roomId) {
                throw new Error('Todos os campos são obrigatórios.')
            }

            const query = 'CALL sortear_ordem_jogadores($1)'

            const params = [roomId]

            return await this.db.exec(query, params)
        } catch (err: any) {
            throw new Error(err)
        }
    }
}