"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedor_controller_1 = require("../controllers/proveedor.controller");
const router = express_1.Router();
class ProveedorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', proveedor_controller_1.proveedoresController.list);
        this.router.post('/', proveedor_controller_1.proveedoresController.create);
        this.router.get('/:id', proveedor_controller_1.proveedoresController.getOne);
        this.router.delete('/:id', proveedor_controller_1.proveedoresController.delete);
        this.router.put('/:id', proveedor_controller_1.proveedoresController.update);
    }
}
const proveedoroutes = new ProveedorRoutes();
exports.default = proveedoroutes.router;
