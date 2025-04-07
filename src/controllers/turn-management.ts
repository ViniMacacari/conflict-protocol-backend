import { Request, Response } from 'express'
import { TurnService } from '../services/turn-management.js'

export class TurnController {
    private service: TurnService = new TurnService()

    async next(req: Request, res: Response): Promise<any> {
        try {
            const { roomId } = req.body

            if (!roomId) {
                return res.status(400).json({ erro: 'ID da sala é obrigatório' })
            }

            await this.service.turn(Number(roomId))
            return res.status(200).json({ sucesso: true })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}