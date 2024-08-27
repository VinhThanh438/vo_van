import { EXCHANGE_NAME, EXCHANGE_TYPE } from '@common/constant/rabbit.constant'
import logger from '@common/logger'
import { RABBITMQ_URI } from '@config/environment'
import rabbitmq, { Channel, Connection } from 'amqplib'

export class RabbitMQAdapter {
    private static connection: Connection
    private static channel: Channel

    public static async connect(): Promise<void> {
        try {
            this.connection = await rabbitmq.connect(RABBITMQ_URI)
            this.channel = await this.connection.createChannel()

            await this.channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
                durable: false
            })

            logger.info('Connected to RabbitMQ successfully')
        } catch (error) {
            logger.error('Cannot connect to RabbitMQ!')
        }
    }

    public static async sendMessageToQueue(message: string, queueName: string): Promise<void> {
        try {
            this.channel.publish(
                EXCHANGE_NAME,
                queueName, 
                Buffer.from(message)
            );
        } catch (error) {
            throw new Error(error.message)
        }
    }
}