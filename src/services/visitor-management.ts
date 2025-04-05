import { Database } from "../database/db"

export class VisitorManagementService {
    private db: Database = new Database()

    async validate(username: string): Promise<any> {
        try {
            if (!username) {
                throw new Error("Username required")
            }

            const sql = 'call gerenciar_visitante($1, null)'

            return await this.db.exec(sql, [username])
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}