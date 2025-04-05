import { EnterRoomService } from "../services/enter-room.js"
import { Request, Response } from "express"

export class EnterRoomController {
    private service: EnterRoomService = new EnterRoomService()

    async enter(req: Request, res: Response): Promise<any> {
        try {
            const { user, roomCode } = req.body

            await this.service.enter({ user: user, roomCode: roomCode })
            return res.status(200).json({ success: true })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}