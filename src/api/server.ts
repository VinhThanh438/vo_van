import routes from '@api/router';
import express, { Express } from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';

export class ExpressServer {
    private server?: Express;
    private httpServer: Server;

    public async setup(port: number): Promise<Express> {
        const server = express();

        this.configBodyParser(server);
        this.useRoute(server);
        this.listen(server, port);
        return this.server;
    }

    public useRoute(app: Express) {
        app.use(routes);
    }

    public configBodyParser(app: Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

    public listen(app: Express, port: number) {
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    }
}