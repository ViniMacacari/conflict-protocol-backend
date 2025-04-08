import express, { Application } from 'express'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import cron from 'node-cron'

import { RoomRouter } from './routes/room.js'
import { UsersRouter } from './routes/users.js'
import { TurnRouter } from './routes/turn.js'

import { InactivateRooms } from './services/inactivate-room.js'

dotenv.config()

class Servidor {
    private app: Application
    private porta: number

    private cronInactivate: InactivateRooms = new InactivateRooms()

    private room: RoomRouter = new RoomRouter()
    private users: UsersRouter = new UsersRouter()
    private turn: TurnRouter = new TurnRouter()

    constructor() {
        this.app = express()
        this.porta = Number(process.env.PORTA_SERVIDOR)
        this.middlewares()
        this.rotas()
    }

    private middlewares(): void {
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 2500,
            keyGenerator: (req: any) => req.ip,
            skip: (req) => req.headers.accept === 'text/event-stream',
            message: { error: 'Muitas requisições. Tente novamente mais tarde.' }
        })

        this.app.use(limiter)
        this.app.use(express.json())
        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction): void {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

            if (req.method === 'OPTIONS') {
                res.sendStatus(200)
                return
            }

            next()
        })
        this.app.use((req, _res, next) => {
            console.log(`[${new Date().toISOString()}] ➡️ ${req.method} ${req.url}`)
            next()
        })
        this.app.use((req, res, next) => {
            res.on('finish', () => {
                console.log(`[${new Date().toISOString()}] ✅ ${req.method} ${req.url} finalizado com ${res.statusCode}`)
            })
            next()
        })
    }

    private rotas(): void {
        this.app.get('/', (_req, res) => { res.json({ message: 'API On' }) })

        this.app.use('/room', this.room.router)
        this.app.use('/users', this.users.router)
        this.app.use('/turn', this.turn.router)
    }

    public iniciar(): void {
        this.app.listen(this.porta, () => {
            console.log('Server running at ' + this.porta)

            cron.schedule('*/5 * * * *', async () => {
                try {
                    await this.cronInactivate.inactivate()
                } catch (e) {
                    console.error('Erro ao inativar salas:', e)
                }
            })
        })
    }
}

new Servidor().iniciar()