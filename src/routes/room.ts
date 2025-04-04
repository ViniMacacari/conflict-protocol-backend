import { Router } from 'express'

import { NewRoomController } from '../controllers/new-room'

export class RoomRouter {
    public router: Router

    private newRoom: NewRoomController = new NewRoomController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/new', (req, res) => this.newRoom.new(req, res))
    }
}