import { MongoAdapter } from '@common/infrastructure/mongo.adapter';
import { RedisAdapter } from '@common/infrastructure/redis.adapter';
import { ExpressServer } from './server';
import { PORT } from '@config/environment';
import { RabbitMQAdapter } from '@common/infrastructure/rabbitmq.adapter';

export class Application {
    public static async createApp(): Promise<ExpressServer> {
        await MongoAdapter.connect();
        await RedisAdapter.connect();
        await RabbitMQAdapter.connect()

        this.registerEvent();

        const expressServer = new ExpressServer();
        expressServer.setup(PORT);

        return expressServer;
    }

    public static registerEvent() {
    }
}