"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("../../modules/User/routes"));
var auth_1 = __importDefault(require("../../modules/auth/auth"));
var Routes = (function () {
    function Routes() {
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(routes_1.default.indexUser);
        app.route('/api/users/create').all(auth.config().authenticate()).post(routes_1.default.createUser);
        app.route('/api/users/:id_user').all(auth.config().authenticate()).get(routes_1.default.findOneUser);
        app.route('/api/users/:id_user/update').all(auth.config().authenticate()).put(routes_1.default.updateUser);
        app.route('/api/users/:id_user/destroy').all(auth.config().authenticate()).delete(routes_1.default.destroyUser);
        app.route('/api/token').post(auth_1.default.auth);
    };
    return Routes;
}());
exports.default = new Routes();
