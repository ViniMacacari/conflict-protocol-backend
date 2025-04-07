import { Database } from '../database/db.js'

export class TurnManagerService {
    private db: Database = new Database()

    async getTurnInfo(roomCode: number): Promise<any> {
        const query = `
            SELECT
                st.id_jogador_atual,
                u.nome AS nome_jogador,
                EXTRACT(EPOCH FROM (st.fim_turno - NOW()))::int AS tempo_restante,
                st.numero_turno,
                p.nome AS personagem
            FROM salas_turnos st
            JOIN salas s ON s.id = st.id_sala
            JOIN usuarios u ON u.id = st.id_jogador_atual
            JOIN personagens_usuarios pu ON pu.id_usuario = u.id AND pu.id_sala = s.id AND pu.ativo IS TRUE
            JOIN personagens p ON p.id = pu.id_personagem
            WHERE s.codigo = $1 AND st.status_turno = 'em_andamento'
            LIMIT 1;
        `
        const result = await this.db.exec(query, [roomCode])
        return result[0] || null
    }

    async nextTurn(roomCode: number): Promise<void> {
        const query = `CALL iniciar_turno($1);`
        await this.db.exec(query, [roomCode])
    }

    async handleTurn(roomCode: number): Promise<any> {
        const info = await this.getTurnInfo(roomCode)

        if (!info) return null

        if (info.tempo_restante <= 0) {
            await this.nextTurn(roomCode)
            return await this.getTurnInfo(roomCode)
        }

        return info
    }

    async startTurn(roomCode: number): Promise<void> {
        const sql = `CALL iniciar_turno($1)`
        await this.db.exec(sql, [roomCode])
    }
}