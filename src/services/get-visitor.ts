import { Database } from "../database/db.js"

export class GetVisitorService {
    private db: Database = new Database()

    async get(username: string): Promise<any> {
        try {
            const sql = 'select id from usuarios where nome = $1'

            return await this.db.exec(sql, [username])
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}