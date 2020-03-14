"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Definição inicial da nossa aplicação API de entrada.
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var bodyParser = __importStar(require("body-parser"));
var routes_1 = __importDefault(require("./routes/routes"));
var swaggerUi = __importStar(require("swagger-ui-express"));
var swaggerDocument = __importStar(require("./swagger.json"));
var auth_1 = __importDefault(require("../auth"));
var handlers_1 = __importDefault(require("./responses/handlers"));
var Api = /** @class */ (function () {
    function Api() {
        this.aplicationExpress = express_1.default();
        this.middleware();
    }
    Api.prototype.middleware = function () {
        this.aplicationExpress.use(morgan_1.default('dev')); //Toda requisição feita será gerada um log no console da aplicação para acompanhamento.
        this.aplicationExpress.use(bodyParser.urlencoded({ extended: true })); // URLENCODED - Formato dos dados submetidas extended true vai ser capaz de interpretar mais informações do que o padrão.
        this.aplicationExpress.use(bodyParser.json()); //Se o que for passado for um JSON transformando em um objeto para ser tratado aqui dentro
        this.aplicationExpress.use(handlers_1.default.errorHandlerApi);
        this.aplicationExpress.use(auth_1.default.config().initialize());
        this.aplicationExpress.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.router(this.aplicationExpress, auth_1.default);
    };
    Api.prototype.router = function (app, auth) {
        routes_1.default.initRoutes(app, auth);
    };
    return Api;
}());
exports.default = new Api().aplicationExpress; //Devolvendo a instância da Class juntamente com a sua propriédade 'aplicationExpress'. 
