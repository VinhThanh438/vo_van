import { ConnectMongoose } from '@common/infrastructure/mongo.adapter';
import { ConnectRedis } from '@common/infrastructure/redis.adapter';
import { ExpressServer } from './server';
import { PORT } from '@config/environment';

export class Application {
    public static async createApp(): Promise<ExpressServer> {
        await ConnectMongoose.connect();
        await ConnectRedis.connect();

        this.registerEvent();

        const expressServer = new ExpressServer();
        expressServer.setup(PORT);

        return expressServer;
    }

    public static registerEvent() {
    }
}