import { Database } from "../database/db.js"

export class UsersRoomsService {
    private db: Database = new Database()

    async get(roomCode: number): Promise<any> {
        try {
            const sql = `
                select
                    u.id as id_usuario,
                    u.nome as nome_usuario,
                    p.nome as personagem,
                    s.codigo as codigo_sala,
                    s.nome as nome_sala
                from
                    salas_usuarios su
                    join usuarios u on su.id_usuario = u.id 
                        and u.ativo = true
                    join salas s on su.id_sala = s.id
                        and s.ativo = true
                    join personagens_usuarios pu on s.id = pu.id_sala
                        and u.id = pu.id_usuario
                        and pu.ativo = true
                    join personagens p on pu.id_personagem = p.id
                where
                    su.ativo = true
                    and s.codigo = $1
            `

            return await this.db.exec(sql, [roomCode])
        } catch (error: any) {
            console.error(error)
            throw new Error(error)
        }
    }
}