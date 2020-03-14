"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = __importStar(require("http-status"));
var jwt = __importStar(require("jwt-simple"));
var bcrypt = __importStar(require("bcrypt"));
var config = require('../../config/env/config')();
var Handlers = (function () {
    function Handlers() {
    }
    Handlers.prototype.onSuccess = function (res, data) {
        return res.status(HTTPStatus.OK).json({ payload: data });
    };
    Handlers.prototype.onError = function (res, message, err) {
        console.log("Error Interno do Server: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    };
    Handlers.prototype.authSuccess = function (res, credentials, data) {
        var isMatch = bcrypt.compareSync(credentials.password, data.password);
        if (isMatch) {
            var payload = { id_user: data.id_user };
            return res.json({
                token: jwt.encode(payload, config.secret)
            });
        }
        else {
            return res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    };
    Handlers.prototype.authFail = function (req, res) {
        return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    Handlers.prototype.dbErrorHandler = function (res, err) {
        console.log("Error de Data Base: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: 'ERR-01',
            message: 'Erro de acesso a base de dados.'
        });
    };
    Handlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.error("API error handler foi executada: " + err);
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            errorCode: 'ERR-001',
            message: 'Erro Interno do Servidor de API'
        });
    };
    return Handlers;
}());
exports.default = new Handlers();
