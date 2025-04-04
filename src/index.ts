import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import rateLimit from 'express-rate-limit'

import { RoomRouter } from './routes/room.js'

dotenv.config()

class Servidor {
    private app: Application
    private porta: number

    private room: RoomRouter = new RoomRouter()

    constructor() {
        this.app = express()
        this.porta = Number(process.env.PORTA_SERVIDOR)
        this.middlewares()
        this.rotas()
    }

    private middlewares(): void {
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000,
            max: 30,
            keyGenerator: (req: any) => {
                return req.ip
            },
            message: { error: 'Muitas requisições. Tente novamente mais tarde.' }
        })

        this.app.use(limiter)
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use('/img', express.static(path.join(__dirname, 'public', 'img')))
        this.app.use(cors())
    }

    private rotas(): void {
        this.app.get('/', (_req, res) => { res.json({ message: 'API On' }) })

        this.app.use('/room', this.room.router)
    }

    public iniciar(): void {
        this.app.listen(this.porta, () => {
            console.log(`Servidor iniciado na porta ${this.porta}`)
        })
    }
}

new Servidor().iniciar()