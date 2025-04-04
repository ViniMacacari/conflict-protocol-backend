import { Database } from "../database/db.js"

export class RoomCreatorService {
    private db: Database = new Database()

    async validate(userId: number, roomCode: number): Promise<any> {
        try {
            const sql = 'select codigo, criador from salas s where s.ativo = true and s.criador = $1 and s.codigo = $2'

            return await this.db.exec(sql, [userId, roomCode])
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}