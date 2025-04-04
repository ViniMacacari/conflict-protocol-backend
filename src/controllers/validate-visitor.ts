import { ValidateVisitorService } from "../services/validate-visitor"
import { Request, Response } from "express"

export class ValidateVisitorController {
    private service: ValidateVisitorService = new ValidateVisitorService()

    async validate(req: Request, res: Response): Promise<any> {
        try {
            if (!req.body) {
                return res.status(400).json({ error: "Request body is required" })
            }

            if (!req.body.username || !req.body.id) {
                return res.status(400).json({ error: "Username and ID are required" })
            }

            const { username, id } = req.body

            const result = await this.service.validate(username, id)

            return res.status(200).json({ userId: result?.[0]?.id })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}