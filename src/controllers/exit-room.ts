import { Request, Response } from "express"
import { ExitRoomService } from "../services/exit-room.js"

export class ExitRoomController {
    private service: ExitRoomService = new ExitRoomService()

    async new(req: Request, res: Response): Promise<any> {
        try {
            const { roomCode, userId } = req.body

            await this.service.exit({ roomCode, userId })

            return res.status(201).json({ sucess: true })
        } catch (err: any) {
            console.log(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}