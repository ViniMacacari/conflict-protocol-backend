import { Router } from 'express'

import { NewRoomController } from '../controllers/new-room.js'
import { CloseRoomController } from '../controllers/close-room.js'
import { RoomCreatorController } from '../controllers/room-creator.js'
import { EnterRoomController } from '../controllers/enter-room.js'
import { ExitRoomController } from '../controllers/exit-room.js'
import { AttackController } from '../controllers/attack.js'
import { HealController } from '../controllers/heal.js'

export class RoomRouter {
    public router: Router

    private newRoom: NewRoomController = new NewRoomController()
    private closeRoom: CloseRoomController = new CloseRoomController()
    private roomCreator: RoomCreatorController = new RoomCreatorController()
    private enterRoom: EnterRoomController = new EnterRoomController()
    private exitRoom: ExitRoomController = new ExitRoomController()
    private attackController: AttackController = new AttackController()
    private healController: HealController = new HealController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.post('/new', (req, res) => this.newRoom.new(req, res))
        this.router.post('/close', (req, res) => this.closeRoom.new(req, res))
        this.router.post('/exit', (req, res) => this.exitRoom.new(req, res))
        this.router.post('/validate', (req, res) => this.roomCreator.validate(req, res))
        this.router.post('/enter', (req, res) => this.enterRoom.enter(req, res))
        this.router.post('/attack', (req, res) => this.attackController.attack(req, res))
        this.router.post('/heal', (req, res) => this.healController.heal(req, res))
    }
}