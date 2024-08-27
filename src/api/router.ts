import express from 'express';
import sampleRouter from './sample/router'
import rabbitRouter from './amqp/router'
const router = express.Router();

router.use('/', sampleRouter)

router.use('/rb', rabbitRouter)

export default router;