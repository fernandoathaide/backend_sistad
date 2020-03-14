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
var serviceUser_1 = __importDefault(require("../User/serviceUser"));
var handlers_1 = __importDefault(require("../../api/responses/handlers"));
var TokenRoutes = /** @class */ (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        var credentials = {
            email: req.body.email,
            password: req.body.password
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            serviceUser_1.default
                .getUserByEmail(credentials.email)
                .then(_.partial(handlers_1.default.authSuccess, res, credentials))
                .catch(_.partial(handlers_1.default.authFail, req, res));
        }
    };
    return TokenRoutes;
}());
exports.default = new TokenRoutes();
