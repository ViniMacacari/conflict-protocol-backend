import { Router } from 'express'

import { NewRoomController } from '../controllers/new-room.js'
import { CloseRoomController } from '../controllers/close-room.js'
import { RoomCreatorController } from '../controllers/room-creator.js'

export class RoomRouter {
    public router: Router

    private newRoom: NewRoomController = new NewRoomController()
    private closeRoom: CloseRoomController = new CloseRoomController()
    private roomCreator: RoomCreatorController = new RoomCreatorController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/new', (req, res) => this.newRoom.new(req, res))
        this.router.post('/close', (req, res) => this.closeRoom.new(req, res))
        this.router.post('/validate', (req, res) => this.roomCreator.validate(req, res))
    }
}