"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var serviceUser_1 = __importDefault(require("./serviceUser"));
var handlers_1 = __importDefault(require("../../api/responses/handlers"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.getAllUser = function (req, res) {
        serviceUser_1.default
            .getAllUser()
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar todos os usuários.'));
    };
    UserController.prototype.createUser = function (req, res) {
        serviceUser_1.default
            .createUser(req.body)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao criar o usuário.'));
    };
    UserController.prototype.getUserById = function (req, res) {
        serviceUser_1.default
            .getUserById(parseInt(req.params.id_user))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao buscar um usuário por ID.'));
    };
    UserController.prototype.updateUser = function (req, res) {
        var id_user = parseInt(req.params.id_user);
        var props = req.body;
        serviceUser_1.default
            .updateUser(id_user, props)
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.dbErrorHandler, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao alterar o usuário.'));
    };
    UserController.prototype.deleteUser = function (req, res) {
        serviceUser_1.default
            .deleteUser(parseInt(req.params.id_user))
            .then(_.partial(handlers_1.default.onSuccess, res))
            .catch(_.partial(handlers_1.default.onError, res, 'Erro ao deletar um usuário.'));
    };
    return UserController;
}());
exports.default = new UserController();
