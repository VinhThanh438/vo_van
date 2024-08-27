import mongoose from 'mongoose';
import { MONGO_URL } from '@config/environment';
import logger from '@common/logger';

export class MongoAdapter {
    static async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URL);
            logger.info('db connected successfully!');
        } catch (error) {
            logger.error('can not connect to db!');
            logger.error(error);
        }
    }
}