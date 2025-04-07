import { Request, Response } from 'express'
import { TurnManagerService } from '../services/current-turn.js'

export class CurrentTurnController {
    private service: TurnManagerService = new TurnManagerService()

    async stream(req: Request, res: Response): Promise<any> {
        const { roomCode } = req.params

        if (!roomCode) {
            res.status(400).json({ erro: 'Código da sala não informado' })
            return
        }

        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

        const loop = async () => {
            while (true) {
                try {
                    let turnInfo = await this.service.getTurnInfo(Number(roomCode))

                    if (!turnInfo) {
                        await this.service.startTurn(Number(roomCode))
                        turnInfo = await this.service.getTurnInfo(Number(roomCode))
                    } else {
                        if (turnInfo.tempo_restante <= 0) {
                            await this.service.startTurn(Number(roomCode))
                            turnInfo = await this.service.getTurnInfo(Number(roomCode))
                        }
                    }

                    if (turnInfo) {
                        res.write(`data: ${JSON.stringify(turnInfo)}\n\n`)
                    }
                } catch (err) {
                    console.error(err)
                    res.write('event: error\ndata: Erro interno\n\n')
                    res.end()
                    break
                }

                await delay(1000)
            }
        }

        loop()
    }
}