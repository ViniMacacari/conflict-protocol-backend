import { Database } from '../database/db.js'

interface Room {
    roomCode: number,
    user: number
}

export class EnterRoomService {
    private db: Database = new Database()

    async enter(data: Room): Promise<any> {
        try {
            const { roomCode, user } = data

            console.log(data)

            if (!roomCode || !user) {
                throw new Error('Todos os campos são obrigatórios.')
            }

            const query = `
                CALL entrar_sala($1, $2);
            `

            const params = [roomCode, user]

            return await this.db.exec(query, params)
        } catch (err: any) {
            throw new Error(err)
        }
    }
}