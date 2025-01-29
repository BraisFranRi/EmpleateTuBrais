import express, {Response, Request} from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import offerRouter from './routes/offer.routes'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cookieParser())
// To do limitar cors 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(helmet())
app.use(compression())

const limiter = rateLimit({
    max: 3,
    windowMs: 1000 * 15 * 60
})
app.use(limiter)

app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/offerts',offerRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Bienvenido al backend (api rest)')
})

export default app