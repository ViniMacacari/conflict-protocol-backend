import { Router } from 'express'
import { GetVisitorController } from '../controllers/get-visitors.js'

export class UsersRouter {
    public router: Router

    private getVisitor: GetVisitorController = new GetVisitorController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.get('/visitor/:username', (req, res) => this.getVisitor.get(req, res))
    }
}