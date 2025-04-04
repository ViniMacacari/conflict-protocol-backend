import { Request, Response } from "express"
import { CloseRoomService } from "../services/close-room"

export class CloseRoomController {
    private service: CloseRoomService = new CloseRoomService()

    async new(req: Request, res: Response): Promise<any> {
        try {
            const { roomCode, userId } = req.body

            await this.service.closeRoom({ roomCode, userId })

            return res.status(201).json({ sucess: true })
        } catch (err: any) {
            console.log(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}