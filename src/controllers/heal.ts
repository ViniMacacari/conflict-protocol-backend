import { Request, Response } from 'express'
import { HealService } from '../services/heal.js'

export class HealController {
    private service = new HealService()

    async heal(req: Request, res: Response): Promise<void> {
        try {
            const { roomCode, targetId, amount } = req.body

            await this.service.heal({
                roomCode: Number(roomCode),
                targetId: Number(targetId),
                amount: Number(amount)
            })

            res.status(200).json({ sucesso: true })
        } catch (err: any) {
            res.status(400).json({ erro: err.message })
        }
    }
}