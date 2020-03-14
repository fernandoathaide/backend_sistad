"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("../../modules/User/routes"));
var auth_1 = __importDefault(require("../../modules/auth/auth"));
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(routes_1.default.indexUser);
        app.route('/api/users/create').all(auth.config().authenticate()).post(routes_1.default.createUser);
        app.route('/api/users/:id_user').all(auth.config().authenticate()).get(routes_1.default.findOneUser);
        app.route('/api/users/:id_user/update').all(auth.config().authenticate()).put(routes_1.default.updateUser);
        app.route('/api/users/:id_user/destroy').all(auth.config().authenticate()).delete(routes_1.default.destroyUser);
        //app.route('/').get(function (req, res) { return res.send('Ola você SISTAD!'); });
        //Rota para acesso ao coverage
        //app.route('/coverage').get(function (req, res) { return res.sendFile('/home/fernano/Documentos/ESTUDOS/ts_node_es6_postgres_projeto/backend_sistad/coverage/index.html'); });
        //Rota da passagem de User Email e geração do Token
        app.route('/api/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
