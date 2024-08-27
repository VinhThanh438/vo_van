import express, { Request, Response } from 'express'
import rabbitmq from 'amqplib'
const router = express.Router()

router.get('/send', (req: Request, res: Response) => {
    res.send('send message')
})

export default router