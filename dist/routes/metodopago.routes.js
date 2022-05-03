"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const metodopago_controller_1 = require("../controllers/metodopago.controller");
const router = express_1.Router();
class PagoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', metodopago_controller_1.pagosController.list);
        this.router.post('/', metodopago_controller_1.pagosController.create);
        this.router.get('/:id', metodopago_controller_1.pagosController.getOne);
        this.router.delete('/:id', metodopago_controller_1.pagosController.delete);
        this.router.put('/:id', metodopago_controller_1.pagosController.update);
    }
}
const pagoRoutes = new PagoRoutes();
exports.default = pagoRoutes.router;
