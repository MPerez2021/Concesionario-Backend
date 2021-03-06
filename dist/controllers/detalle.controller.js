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
exports.detallesController = void 0;
const database_1 = require("../database");
class DetallesController {
    index(req, res) {
        res.send('Detalles');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { placa_carro, numero_factura, precio, cantidad, precio_total } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.detalle (placa_carro,numero_factura,precio,cantidad, precio_total) values($1, $2, $3, $4, $5)', [placa_carro, numero_factura, precio, cantidad, precio_total]);
            return res.json({
                message: 'Detalle ingresado con éxito',
                body: {
                    user: {
                        placa_carro,
                        numero_factura,
                        precio,
                        cantidad,
                        precio_total
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.detalle');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.detalle WHERE cod_detalle = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { placa_carro, numero_factura, precio, cantidad, precio_total } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.detalle SET placa_carro = $1, numero_factura = $2, precio = $3, cantidad = $4, precio_total = $5 WHERE cod_detalle = $6', [placa_carro, numero_factura, precio, cantidad, precio_total, id]);
            res.json('Detalle Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.detalle WHERE cod_detalle = $1', [id]);
            res.json('Detalle Eliminado');
        });
    }
}
exports.detallesController = new DetallesController;
