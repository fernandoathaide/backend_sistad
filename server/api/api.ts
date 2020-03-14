//Definição inicial da nossa aplicação API de entrada.
import express from 'express';
import { Application } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import Auth from '../auth';

import Handlers from './responses/handlers';

class Api{

    public aplicationExpress: Application;

    constructor(){
        this.aplicationExpress = express();
        this.middleware();
    }

    middleware(): void{
        this.aplicationExpress.use(morgan('dev')); //Toda requisição feita será gerada um log no console da aplicação para acompanhamento.
        this.aplicationExpress.use(bodyParser.urlencoded({extended: true})); // URLENCODED - Formato dos dados submetidas extended true vai ser capaz de interpretar mais informações do que o padrão.
        this.aplicationExpress.use(bodyParser.json());//Se o que for passado for um JSON transformando em um objeto para ser tratado aqui dentro
        this.aplicationExpress.use(Handlers.errorHandlerApi);
        this.aplicationExpress.use(Auth.config().initialize());
        this.aplicationExpress.use('/api/swagger',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.router(this.aplicationExpress, Auth);
    }

    private router(app: Application, auth: any): void{
        Routes.initRoutes(app, auth);
    }
}

export default new Api().aplicationExpress; //Devolvendo a instância da Class juntamente com a sua propriédade 'aplicationExpress'. 