import { Request, Response } from "express"
import { UsersRoomsService } from "../services/users-rooms.js"

export class UsersRoomsController {
    private service: UsersRoomsService = new UsersRoomsService()

    async get(req: Request, res: Response): Promise<any> {
        try {
            const { roomCode } = req.params
            if (!roomCode) {
                return res.status(400).json({ erro: "Código da sala não informado" })
            }

            const result = await this.service.get(Number(roomCode))
            return res.status(200).json({ data: result })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }

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
        let lastCount = 0
        let tentativas = 0

        const sendUpdates = async () => {
            while (true) {
                const data = await this.service.get(Number(roomCode))

                if (!data || data.length === 0) {
                    tentativas++

                    if (tentativas >= 3) {
                        res.write('event: error\ndata: Sala não encontrada ou esvaziada\n\n')
                        res.end()
                        break
                    }
                } else {
                    tentativas = 0
                    if (data.length !== lastCount) {
                        lastCount = data.length
                        res.write(`data: ${JSON.stringify(data)}\n\n`)
                    }

                    if (data.length >= 4) {
                        res.write('event: close\ndata: done\n\n')
                        res.end()
                        break
                    }
                }

                await delay(1000)
            }
        }

        sendUpdates()
    }
}