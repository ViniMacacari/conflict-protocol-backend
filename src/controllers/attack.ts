import { Request, Response } from 'express'
import { AttackService } from '../services/attack.js'

export class AttackController {
    private service = new AttackService()

    async attack(req: Request, res: Response): Promise<void> {
        try {
            const { roomCode, targetId, damage } = req.body

            await this.service.attack({
                roomCode: Number(roomCode),
                targetId: Number(targetId),
                damage: Number(damage)
            })

            res.status(200).json({ sucesso: true })
        } catch (err: any) {
            res.status(400).json({ erro: err.message })
        }
    }
}