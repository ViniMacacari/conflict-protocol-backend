import { Router } from 'express'

import { NewRoomController } from '../controllers/new-room'
import { CloseRoomController } from '../controllers/close-room'

export class RoomRouter {
    public router: Router

    private newRoom: NewRoomController = new NewRoomController()
    private closeRoom: CloseRoomController = new CloseRoomController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/new', (req, res) => this.newRoom.new(req, res))
        this.router.post('/close', (req, res) => this.closeRoom.new(req, res))
    }
}