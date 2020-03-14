"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = require("passport-jwt");
var serviceUser_1 = __importDefault(require("./modules/User/serviceUser"));
var config = require('./config/env/config')();
var Auth = /** @class */ (function () {
    function Auth() {
    }
    Auth.prototype.config = function () {
        var opts = {
            secretOrKey: config.secret,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt')
        };
        passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwtPayload, done) {
            serviceUser_1.default
                .getUserById(jwtPayload.id_user)
                .then(function (user) {
                if (user) {
                    return done(null, {
                        id_user: user['id_user'],
                        email: user['email']
                    });
                }
                return done(null, false);
            })
                .catch(function (error) {
                done(error, null);
            });
        }));
        return {
            //Com a ES6 podemos fazer a declaração inline de uma ArrowFunction caso este possua apenas um comando.
            initialize: function () { return passport_1.default.initialize(); },
            authenticate: function () { return passport_1.default.authenticate('jwt', { session: false }); }
        };
    };
    return Auth;
}());
exports.default = new Auth();
