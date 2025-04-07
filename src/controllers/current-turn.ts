import { Request, Response } from 'express'
import { TurnManagerService } from '../services/current-turn.js'

type TurnCache = {
    data: any,
    lastUpdate: number
}

const turnCache: Map<string, TurnCache> = new Map()

export class CurrentTurnController {
    private service: TurnManagerService = new TurnManagerService()

    async stream(req: Request, res: Response): Promise<void> {
        const { roomCode } = req.params
        const userId = Number(req.query.userId)

        if (!roomCode) {
            res.status(400).json({ erro: 'Código da sala não informado' })
            return
        }

        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        req.on('close', () => {
            clearInterval(interval)
            res.end()
        })

        const sendUpdate = async () => {
            try {
                const cached = turnCache.get(roomCode)
                const now = Date.now()

                let turnInfo = cached?.data
                const needsRefresh = !cached || (now - cached.lastUpdate > 1000)

                if (needsRefresh) {
                    let info = await this.service.getTurnInfo(Number(roomCode))

                    if (!info || info.tempo_restante <= 0) {
                        await this.service.startTurn(Number(roomCode), userId)
                        info = await this.service.getTurnInfo(Number(roomCode))
                    }

                    turnInfo = info
                    turnCache.set(roomCode, { data: info, lastUpdate: now })
                }

                if (turnInfo) {
                    res.write(`data: ${JSON.stringify(turnInfo)}\n\n`)
                }
            } catch (err) {
                console.error(err)
                res.write('event: error\ndata: Erro interno\n\n')
                clearInterval(interval)
                res.end()
            }
        }

        const interval = setInterval(sendUpdate, 1000)
    }
}