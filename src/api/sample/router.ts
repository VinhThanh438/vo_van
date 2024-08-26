import express, { Request, Response } from 'express';
import Redis from 'ioredis';
import { ConnectRedis } from '@common/infrastructure/redis.adapter';

const option = {
    host: 'localhost',
    port: 6379
}
const publisher = new Redis(option);
const subcriber = new Redis(option)
const router = express.Router();

const channel = 'new-message';

router.get('/', (req: Request, res: Response) => {
    publisher.publish(channel, JSON.stringify({ message: 'bonjour' }));
    return res.send('oke');
});

const subscribeToMessage = (channel: string) => {
    subcriber.subscribe(channel, (err, count) => {
        if (err) console.log(err);
        console.log(count);
    });

    subcriber.on("message", (channel, data) => {
        console.log(channel, JSON.parse(data));
    });
};

subscribeToMessage(channel);

export default router;