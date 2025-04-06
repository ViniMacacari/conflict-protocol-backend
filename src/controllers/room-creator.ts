import { RoomCreatorService } from "../services/room-creator.js"
import { Request, Response } from "express"

export class RoomCreatorController {
    private service: RoomCreatorService = new RoomCreatorService()

    async validate(req: Request, res: Response): Promise<any> {
        try {
            if (!req.body) {
                return res.status(400).json({ erro: 'Dados não informados' })
            }

            if (!req.body.userId) {
                return res.status(400).json({ erro: 'Usuário não informado' })
            }

            const { userId, roomCode } = req.body

            const result = await this.service.validate(
                userId,
                roomCode
            )

            console.log(result)

            return res.status(200).json({ result: !!(result?.length) })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}