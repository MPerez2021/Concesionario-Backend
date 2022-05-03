"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mantenimiento_controller_1 = require("../controllers/mantenimiento.controller");
const router = express_1.Router();
class MantenimientoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', mantenimiento_controller_1.mantenimientosController.list);
        this.router.post('/', mantenimiento_controller_1.mantenimientosController.create);
        this.router.get('/:id', mantenimiento_controller_1.mantenimientosController.getOne);
        this.router.delete('/:id', mantenimiento_controller_1.mantenimientosController.delete);
        this.router.put('/:id', mantenimiento_controller_1.mantenimientosController.update);
    }
}
const mantenimientoRoutes = new MantenimientoRoutes();
exports.default = mantenimientoRoutes.router;
