"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const router = express_1.Router();
class ClienteRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', clientes_controller_1.clientsController.list);
        this.router.post('/', clientes_controller_1.clientsController.create);
        this.router.get('/:id', clientes_controller_1.clientsController.getOne);
        this.router.delete('/:id', clientes_controller_1.clientsController.delete);
        this.router.put('/:id', clientes_controller_1.clientsController.update);
    }
}
const clienteRoutes = new ClienteRoutes();
exports.default = clienteRoutes.router;
