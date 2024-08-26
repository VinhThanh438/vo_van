import logger from '@common/logger';
import { Application } from '@api/application';

Application.createApp().then(() => {
    logger.info('Application created successfully!!!!!');
});