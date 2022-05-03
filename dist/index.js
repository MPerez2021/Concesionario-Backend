"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const factura_routes_1 = __importDefault(require("./routes/factura.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const carro_routes_1 = __importDefault(require("./routes/carro.routes"));
const empleado_routes_1 = __importDefault(require("./routes/empleado.routes"));
const metodopago_routes_1 = __importDefault(require("./routes/metodopago.routes"));
const pedido_routes_1 = __importDefault(require("./routes/pedido.routes"));
const proveedor_routes_1 = __importDefault(require("./routes/proveedor.routes"));
const sucursal_routes_1 = __importDefault(require("./routes/sucursal.routes"));
const mantenimiento_routes_1 = __importDefault(require("./routes/mantenimiento.routes"));
const detalle_routes_1 = __importDefault(require("./routes/detalle.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', index_1.default);
        this.app.use('/api/clientes', client_routes_1.default);
        this.app.use('/api/carros', carro_routes_1.default);
        this.app.use('/api/facturas', factura_routes_1.default);
        this.app.use('/api/empleados', empleado_routes_1.default);
        this.app.use('/api/pagos', metodopago_routes_1.default);
        this.app.use('/api/pedidos', pedido_routes_1.default);
        this.app.use('/api/proveedores', proveedor_routes_1.default);
        this.app.use('/api/sucursales', sucursal_routes_1.default);
        this.app.use('/api/mantenimientos', mantenimiento_routes_1.default);
        this.app.use('/api/detalles', detalle_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Serve on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
//midlewares
