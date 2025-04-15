import { Database } from '../database/db.js'

export class TurnManagerService {
    private db: Database = new Database()

    async getTurnInfo(roomCode: number): Promise<any> {
        let attempts = 0

        while (attempts < 4) {
            const query = `
                SELECT
                    st.id_jogador_atual,
                    u.nome AS nome_jogador,
                    CEIL(EXTRACT(EPOCH FROM (st.fim_turno - NOW())))::int AS tempo_restante,
                    st.numero_turno,
                    p.nome AS personagem,
                    pu.vida,
                    p.vida as vida_maxima
                FROM salas_turnos st
                JOIN salas s ON s.id = st.id_sala
                JOIN usuarios u ON u.id = st.id_jogador_atual
                JOIN personagens_usuarios pu ON pu.id_usuario = u.id AND pu.id_sala = s.id AND pu.ativo IS TRUE
                JOIN personagens p ON p.id = pu.id_personagem
                WHERE s.codigo = $1 AND st.status_turno = 'em_andamento'
                LIMIT 1;
            `

            const result = await this.db.exec(query, [roomCode])
            const turnInfo = result[0]

            if (!turnInfo) return null

            if (turnInfo.vida <= 0) {
                await this.startTurn(roomCode, turnInfo.id_jogador_atual)
                attempts++
            } else {
                return turnInfo
            }
        }

        return null
    }

    async isRoomOwner(roomCode: number, userId: number): Promise<boolean> {
        const query = `SELECT criador FROM salas WHERE codigo = $1 AND ativo IS TRUE`
        const result = await this.db.exec(query, [roomCode])
        return result?.[0]?.criador == userId
    }

    async startTurn(roomCode: number, userId: number): Promise<void> {
        const isOwner = await this.isRoomOwner(roomCode, userId)
        if (!isOwner) return

        await this.db.exec(`CALL iniciar_turno($1, $2)`, [roomCode, userId])
    }
}