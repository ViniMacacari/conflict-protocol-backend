import { GetVisitorService } from "../services/get-visitor.js"
import { Request, Response } from "express"

export class GetVisitorController {
    private service: GetVisitorService = new GetVisitorService()

    async get(req: Request, res: Response): Promise<any> {
        try {
            const { username } = req.params

            const result = await this.service.get(username)

            return res.status(200).json({ userId: result?.[0]?.id })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}