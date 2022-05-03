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
exports.pedidosController = void 0;
const database_1 = require("../database");
class PedidosController {
    index(req, res) {
        res.send('Pedidos');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_sucursal, nombre_prov, valor_total, vehiculo } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.pedido (nombre_sucursal, nombre_prov, valor_total, vehiculo) values($1, $2, $3, $4)', [nombre_sucursal, nombre_prov, valor_total, vehiculo]);
            return res.json({
                message: 'Pedido ingresado con éxito',
                body: {
                    user: {
                        nombre_sucursal,
                        nombre_prov,
                        valor_total,
                        vehiculo
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.pedido');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.pedido WHERE num_pedido = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre_sucursal, nombre_prov, valor_total, vehiculo } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.pedido SET nombre_sucursal = $1, nombre_prov = $2, valor_total = $3, vehiculo = $4 WHERE num_pedido = $5', [nombre_sucursal, nombre_prov, valor_total, vehiculo, id]);
            res.json('Pedido Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.pedido WHERE num_pedido = $1', [id]);
            res.json('Pedido Eliminado');
        });
    }
}
exports.pedidosController = new PedidosController;
