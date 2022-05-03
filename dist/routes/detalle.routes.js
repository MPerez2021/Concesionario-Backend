"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalle_controller_1 = require("../controllers/detalle.controller");
const router = express_1.Router();
class DetalleRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', detalle_controller_1.detallesController.list);
        this.router.post('/', detalle_controller_1.detallesController.create);
        this.router.get('/:id', detalle_controller_1.detallesController.getOne);
        this.router.delete('/:id', detalle_controller_1.detallesController.delete);
        this.router.put('/:id', detalle_controller_1.detallesController.update);
    }
}
const detalleRoutes = new DetalleRoutes();
exports.default = detalleRoutes.router;
