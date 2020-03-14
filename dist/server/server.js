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
var http = __importStar(require("http"));
var api_1 = __importDefault(require("./api/api"));
var models = require('./models');
var config = require('./config/env/config')();
var server = http.createServer(api_1.default);
models.sequelize.sync().then(function () {
    server.listen(config.serverPort);
    server.on('listening', function () { return console.log("server running on port " + config.serverPort); });
    server.on('error', function (error) { return console.log("Erro: " + error); });
});
