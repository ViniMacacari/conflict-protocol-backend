import { Database } from "../database/db.js"

export class InactivateRooms {
    private db: Database = new Database()

    async inactivate(): Promise<any> {
        try {
            const query = `
                CALL inativar_salas_antigas();
            `

            await this.db.exec(query)

            return { message: 'Salas inativadas com sucesso.' }
        } catch (err: any) {
            throw new Error(err)
        }
    }
}