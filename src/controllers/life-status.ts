import { Request, Response } from 'express'
import { LifeStatusService } from '../services/life-status.js'

export class LifeStatusController {
    private service = new LifeStatusService()

    async list(req: Request, res: Response): Promise<void> {
        try {
            const { roomCode } = req.params

            if (!roomCode) {
                res.status(400).json({ erro: 'Código da sala é obrigatório.' })
                return
            }

            const result = await this.service.getUsersInRoom(Number(roomCode))
            res.status(200).json(result)
        } catch (err: any) {
            res.status(500).json({ erro: err.message })
        }
    }
}