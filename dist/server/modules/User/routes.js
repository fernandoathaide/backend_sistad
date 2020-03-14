"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllerUser_1 = __importDefault(require("./controllerUser"));
var UserRoutes = (function () {
    function UserRoutes() {
    }
    UserRoutes.prototype.indexUser = function (req, res) {
        return controllerUser_1.default.getAllUser(req, res);
    };
    UserRoutes.prototype.createUser = function (req, res) {
        return controllerUser_1.default.createUser(req, res);
    };
    UserRoutes.prototype.findOneUser = function (req, res) {
        return controllerUser_1.default.getUserById(req, res);
    };
    UserRoutes.prototype.updateUser = function (req, res) {
        return controllerUser_1.default.updateUser(req, res);
    };
    UserRoutes.prototype.destroyUser = function (req, res) {
        return controllerUser_1.default.deleteUser(req, res);
    };
    return UserRoutes;
}());
exports.default = new UserRoutes();
