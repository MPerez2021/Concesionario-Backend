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
exports.mantenimientosController = void 0;
const database_1 = require("../database");
class MantenimientosController {
    index(req, res) {
        res.send('Mantenimientos');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.mantenimiento (cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total) values($1, $2, $3, $4, $5, $6)', [cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total]);
            return res.json({
                message: 'Mantenimiento ingresado con éxito',
                body: {
                    user: {
                        cedula_cliente,
                        cedula_empleado,
                        descripcion,
                        subtotal,
                        iva,
                        valor_total
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.mantenimiento');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.mantenimiento WHERE cod_mant = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.mantenimiento SET cedula_cliente = $1, cedula_empleado = $2, descripcion = $3, subtotal = $4, iva = $5, valor_total = $6 WHERE cod_mant = $7', [cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total, id]);
            res.json('Mantenimiento Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.mantenimiento WHERE cod_mant = $1', [id]);
            res.json('Mantenimiento Eliminado');
        });
    }
}
exports.mantenimientosController = new MantenimientosController;
