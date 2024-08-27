import express, { Request, Response } from 'express'
import { RabbitMQAdapter } from '@common/infrastructure/rabbitmq.adapter'
const router = express.Router()

router.get('/send', (req: Request, res: Response) => {
    RabbitMQAdapter.sendMessageToQueue('Bonjour', 'vo-van')
    res.send('send message')
})

export default router