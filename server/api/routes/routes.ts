import { Application } from 'express';
import UserRoutes from '../../modules/User/routes';
import TokenRoutes from '../../modules/auth/auth'

class Routes {

    constructor(){}

    initRoutes(app: Application, auth: any): void{
        app.route('/api/users/all').all(auth.config().authenticate()).get(UserRoutes.indexUser);
        app.route('/api/users/create').all(auth.config().authenticate()).post(UserRoutes.createUser);
        app.route('/api/users/:id_user').all(auth.config().authenticate()).get(UserRoutes.findOneUser);
        app.route('/api/users/:id_user/update').all(auth.config().authenticate()).put(UserRoutes.updateUser);
        app.route('/api/users/:id_user/destroy').all(auth.config().authenticate()).delete(UserRoutes.destroyUser);
        
        //app.route('/').get(function (req, res) { return res.send('Ola você SISTAD!'); });
        //Rota para acesso ao coverage
        //app.route('/coverage').get(function (req, res) { return res.sendFile('/home/fernano/Documentos/ESTUDOS/ts_node_es6_postgres_projeto/backend_sistad/coverage/index.html'); });

        //Rota da passagem de User Email e geração do Token
        app.route('/api/token').post(TokenRoutes.auth);

    }
}
export default new Routes();