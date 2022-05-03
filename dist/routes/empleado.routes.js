"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empleado_controller_1 = require("../controllers/empleado.controller");
const router = express_1.Router();
class EmpleadoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', empleado_controller_1.empleadosController.list);
        this.router.post('/', empleado_controller_1.empleadosController.create);
        this.router.get('/:id', empleado_controller_1.empleadosController.getOne);
        this.router.delete('/:id', empleado_controller_1.empleadosController.delete);
        this.router.put('/:id', empleado_controller_1.empleadosController.update);
    }
}
const empleadoRoutes = new EmpleadoRoutes();
exports.default = empleadoRoutes.router;
