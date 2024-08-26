import express from 'express';
import sampleRouter from './sample/router'
const router = express.Router();

router.use('/', sampleRouter)

export default router;