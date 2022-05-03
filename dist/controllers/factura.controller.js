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
exports.facturasController = void 0;
const database_1 = require("../database");
class FacturasController {
    index(req, res) {
        res.send('Facturas');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.factura (cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total) values($1, $2, $3, $4, $5, $6, $7)', [cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total]);
            return res.json({
                message: 'Factura ingresado con éxito',
                body: {
                    user: {
                        cedula_cliente,
                        cedula_empleado,
                        metodo_pago,
                        nombre_sucursal,
                        num_factura,
                        fecha_emision,
                        valor_total
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.factura');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.factura WHERE num_factura = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.factura SET cedula_cliente = $1, cedula_empleado = $2, metodo_pago = $3, nombre_sucursal = $4, num_factura = $5, fecha_emision= $6, valor_total=$7 WHERE num_factura = $8', [cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total, id]);
            res.json('Factura Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.factura WHERE num_factura = $1', [id]);
            res.json('Factura Eliminado');
        });
    }
}
exports.facturasController = new FacturasController;
