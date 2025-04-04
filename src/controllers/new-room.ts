import { Request, Response } from "express"
import { NewRoomService } from "../services/new-room"

export class NewRoomController {
    private service: NewRoomService = new NewRoomService()

    async new(req: Request, res: Response): Promise<any> {
        try {
            const { name, user, time } = req.body

            const result = await this.service.newRoom({ name, user, time })

            return res.status(201).json({ roomCode: result?.[0]?.p_codigo })
        } catch (err: any) {
            console.log(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}