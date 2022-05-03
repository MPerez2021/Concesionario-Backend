"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucursal_controller_1 = require("../controllers/sucursal.controller");
const router = express_1.Router();
class SucursalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sucursal_controller_1.sucursalesController.list);
        this.router.post('/', sucursal_controller_1.sucursalesController.create);
        this.router.get('/:id', sucursal_controller_1.sucursalesController.getOne);
        this.router.delete('/:id', sucursal_controller_1.sucursalesController.delete);
        this.router.put('/:id', sucursal_controller_1.sucursalesController.update);
    }
}
const sucursalRoutes = new SucursalRoutes();
exports.default = sucursalRoutes.router;
