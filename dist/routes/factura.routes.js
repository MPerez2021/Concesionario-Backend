"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factura_controller_1 = require("../controllers/factura.controller");
const router = express_1.Router();
class FacturaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', factura_controller_1.facturasController.list);
        this.router.post('/', factura_controller_1.facturasController.create);
        this.router.get('/:id', factura_controller_1.facturasController.getOne);
        this.router.delete('/:id', factura_controller_1.facturasController.delete);
        this.router.put('/:id', factura_controller_1.facturasController.update);
    }
}
const facturaRoutes = new FacturaRoutes();
exports.default = facturaRoutes.router;
