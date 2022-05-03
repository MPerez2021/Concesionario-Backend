"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carro_controller_1 = require("../controllers/carro.controller");
const router = express_1.Router();
class CarroRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', carro_controller_1.carrosController.list);
        this.router.post('/', carro_controller_1.carrosController.create);
        this.router.get('/:id', carro_controller_1.carrosController.getOne);
        this.router.delete('/:id', carro_controller_1.carrosController.delete);
        this.router.put('/:id', carro_controller_1.carrosController.update);
    }
}
const carroRoutes = new CarroRoutes();
exports.default = carroRoutes.router;
