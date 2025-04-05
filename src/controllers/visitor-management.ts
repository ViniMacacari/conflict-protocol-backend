import { VisitorManagementService } from "../services/visitor-management.js"
import { Request, Response } from "express"

export class VisitorManagementController {
    private service: VisitorManagementService = new VisitorManagementService()

    async validate(req: Request, res: Response): Promise<any> {
        try {
            if (!req.body) {
                return res.status(400).json({ error: "Request body is required" })
            }

            if (!req.body.username) {
                return res.status(400).json({ error: "Username required" })
            }

            const { username } = req.body

            const result = await this.service.validate(username)

            return res.status(200).json({ userId: result?.[0]?.p_id_usuario })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({ erro: err.message })
        }
    }
}