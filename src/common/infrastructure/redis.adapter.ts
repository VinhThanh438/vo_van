import ioredis, { Redis } from 'ioredis';
import { REDIS_URL } from '@config/environment';
import logger from '@common/logger';

export class RedisAdapter {
    private static client: Redis;
    // private static subcriber: Redis;
    private static allClients: Redis[] = [];

    static async getClient(): Promise<Redis> {
        if (!RedisAdapter.client) {
            await RedisAdapter.connect();
        }
        return RedisAdapter.client;
    }

    static async connect(overrideClient = true): Promise<Redis> {
        const tmp = new ioredis(REDIS_URL, {
            lazyConnect: true,
            maxRetriesPerRequest: 10,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000);
                if (times < 5) {
                    return delay;
                }
                process.exit(1);
            },
        });

        tmp.on('ready', () => {
            logger.info('Connect to redis successfully!');
        });
        tmp.on('end', () => {
            logger.info('Connect to redis ended!');
        });

        tmp.on('error', (error) => {
            logger.error('Can not connect to redis', error);
        });

        try {
            await tmp.connect();
        } catch (error) {
            logger.error('Can not connect to redis', error);
            process.exit(1);
        }

        if (overrideClient) {
            RedisAdapter.client = tmp;
        }

        RedisAdapter.allClients.push(tmp);

        return tmp;
    }

    static async disconnect(): Promise<void> {
        logger.info('Closing redis connection...');
        try {
            await Promise.all(RedisAdapter.allClients.map((client) => client.quit()));
        } catch (error) {
            logger.error('Closing redis connection error!', error);
        }
    }

    static createClient(): Redis {
        const tmp = new ioredis(REDIS_URL);

        tmp.on('ready', () => {
            logger.info('Connect to redis successfully!');
        });
        tmp.on('end', () => {
            logger.info('Connect to redis ended!');
        });

        tmp.on('error', (error) => {
            logger.error('Can not connect to redis!', error);
        });

        RedisAdapter.allClients.push(tmp);

        return tmp;
    }

    static serialize(value: unknown): string {
        if (value) {
            return JSON.stringify(value);
        }
        return value as string;
    }

    static deserialize(value: unknown): unknown {
        if (value && typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
    }

    static async get(key: string, shouldDeserialize = false): Promise<unknown> {
        const value = await (await RedisAdapter.getClient()).get(key);
        return shouldDeserialize ? RedisAdapter.deserialize(value) : value;
    }

    static async set(
        key: string,
        value: unknown,
        ttl = 0,
        shouldSerialize = false,
    ): Promise<unknown> {
        const stringValue: string = shouldSerialize
            ? RedisAdapter.serialize(value)
            : (value as string);
        if (ttl > 0) {
            return (await RedisAdapter.getClient()).set(key, stringValue, 'EX', ttl);
        }
        return (await RedisAdapter.getClient()).set(key, stringValue);
    }

    static async delete(key: string): Promise<unknown> {
        return (await RedisAdapter.getClient()).del(key);
    }
}