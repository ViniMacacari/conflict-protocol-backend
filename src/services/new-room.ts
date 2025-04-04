import { Database } from '../database/db.js'

interface Room {
    name: string,
    user: string,
    time: number
}

export class NewRoomService {
    private db: Database = new Database()

    async newRoom(data: Room): Promise<any> {
        try {
            const { name, user, time } = data

            console.log(data)

            if (!name || !user || !time) {
                throw new Error('Todos os campos são obrigatórios.')
            }

            const query = `
                CALL criar_sala($1, $2, $3, null);
            `

            const params = [name, user, time]

            return await this.db.exec(query, params)
        } catch (err: any) {
            throw new Error(err)
        }
    }
}