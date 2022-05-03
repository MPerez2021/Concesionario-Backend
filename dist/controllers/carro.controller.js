"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrosController = void 0;
const database_1 = require("../database");
class CarrosController {
    index(req, res) {
        res.send('carros');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion, marca, color, precio, placa, modelo } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.carro (descripcion, marca, color, precio, placa, modelo) values($1, $2, $3, $4, $5, $6)', [descripcion, marca, color, precio, placa, modelo]);
            return res.json({
                message: 'Carro ingresado con éxito',
                body: {
                    user: {
                        descripcion,
                        marca,
                        color,
                        precio,
                        placa,
                        modelo
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.carro');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.carro WHERE placa = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { descripcion, marca, color, precio, placa, modelo } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.carro SET descripcion = $1, marca = $2, color = $3, precio = $4, placa = $5, modelo = $6 WHERE placa = $7', [descripcion, marca, color, precio, placa, modelo, id]);
            res.json('Carro Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.carro WHERE placa = $1', [id]);
            res.json('Carro Eliminado');
        });
    }
}
exports.carrosController = new CarrosController;
