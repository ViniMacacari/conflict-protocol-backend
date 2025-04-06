import { Database } from '../database/db.js'

interface Room {
    roomCode: number,
    userId: number
}

export class ExitRoomService {
    private db: Database = new Database()

    async exit(data: Room): Promise<any> {
        try {
            const { roomCode, userId } = data

            if (!roomCode || !userId) {
                throw new Error('Todos os campos são obrigatórios.')
            }

            const query = `
                CALL sair_sala($1, $2);
            `

            const params = [roomCode, userId]

            return await this.db.exec(query, params)
        } catch (err: any) {
            throw new Error(err)
        }
    }
}