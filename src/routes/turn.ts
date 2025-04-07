import { Router } from 'express'

import { TurnController } from '../controllers/turn-management.js'
import { CurrentTurnController } from '../controllers/current-turn.js'

export class TurnRouter {
    public router: Router

    private turn: TurnController = new TurnController()
    private currentTurn: CurrentTurnController = new CurrentTurnController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/next', (req, res) => this.turn.next(req, res))
        this.router.get('/:roomCode', (req, res) => this.currentTurn.stream(req, res))
    }
}