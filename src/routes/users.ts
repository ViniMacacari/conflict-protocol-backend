import { Router } from 'express'
import { GetVisitorController } from '../controllers/get-visitors.js'
import { UsersRoomsController } from '../controllers/users-rooms.js'
import { ValidateVisitorController } from '../controllers/validate-visitor.js'

export class UsersRouter {
    public router: Router

    private getVisitor: GetVisitorController = new GetVisitorController()
    private usersRooms: UsersRoomsController = new UsersRoomsController()
    private validateVisitor: ValidateVisitorController = new ValidateVisitorController()

    constructor() {
        this.router = Router()
        this.registerRoutes()
    }

    private registerRoutes(): void {
        this.router.get('/visitor/:username', (req, res) => this.getVisitor.get(req, res))
        this.router.get('/rooms/:roomCode', (req, res) => this.usersRooms.stream(req, res))
        this.router.post('/visitor-validator', (req, res) => this.validateVisitor.validate(req, res))
    }
}