import { Router } from 'express'

import { TurnController } from '../controllers/turn-management.js'

export class TurnRouter {
    public router: Router

    private turn: TurnController = new TurnController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/next', (req, res) => this.turn.next(req, res))
    }
}