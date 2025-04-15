import { Database } from '../database/db.js'

export class LifeStatusService {
    private db = new Database()

    async getUsersInRoom(roomCode: number): Promise<any[]> {
        const query = `
      SELECT
        u.id AS id_usuario,
        u.nome,
        p.nome AS personagem,
        pu.vida
      FROM salas s
      JOIN personagens_usuarios pu ON pu.id_sala = s.id AND pu.ativo = true
      JOIN usuarios u ON u.id = pu.id_usuario
      JOIN personagens p ON p.id = pu.id_personagem
      WHERE s.codigo = $1
      ORDER BY u.id;
    `

        return await this.db.exec(query, [roomCode])
    }
}