import { Database } from "../database/db.js"

export class ValidateVisitorService {
    private db: Database = new Database()

    async validate(username: string, id: number): Promise<any> {
        try {
            if (!username || !id) {
                throw new Error("Username and ID are required")
            }

            const sql = 'select id from usuarios where nome = $1 and id = $2'

            return await this.db.exec(sql, [username, id])
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}