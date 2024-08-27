import path from 'path';
import dotenv from 'dotenv-safe';

dotenv.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

export const PORT: number = parseInt(process.env.PORT, 10) || 3000;
export const MONGO_URL: string = process.env.MONGO_URL;
export const REDIS_URL: string = process.env.REDIS_URL;
export const RABBITMQ_URI: string = process.env.RABBITMQ_URI
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
export const ACCESSTOKEN_KEY: string = process.env.JWT_ACCESSTOKEN_KEY;
export const REFRESHTOKEN_KEY: string = process.env.JWT_REFRESHTOKEN_KEY;