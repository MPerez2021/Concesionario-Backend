"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedido_controller_1 = require("../controllers/pedido.controller");
const router = express_1.Router();
class PedidoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pedido_controller_1.pedidosController.list);
        this.router.post('/', pedido_controller_1.pedidosController.create);
        this.router.get('/:id', pedido_controller_1.pedidosController.getOne);
        this.router.delete('/:id', pedido_controller_1.pedidosController.delete);
        this.router.put('/:id', pedido_controller_1.pedidosController.update);
    }
}
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;
