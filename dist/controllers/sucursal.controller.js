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
exports.sucursalesController = void 0;
const database_1 = require("../database");
class SucursalesController {
    index(req, res) {
        res.send('Sucursales');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, telefono, direccion } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.sucursales (nombre, telefono,direccion) values($1, $2, $3)', [nombre, telefono, direccion]);
            return res.json({
                message: 'Sucursal ingresada con éxito',
                body: {
                    user: {
                        nombre,
                        telefono,
                        direccion
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.sucursales');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.sucursales WHERE nombre = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, telefono, direccion } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.sucursales SET nombre = $1, telefono = $2, direccion = $3 WHERE nombre = $4', [nombre, telefono, direccion, id]);
            res.json('Sucursal Actualizada');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.sucursales WHERE nombre = $1', [id]);
            res.json('Sucursal Eliminada');
        });
    }
}
exports.sucursalesController = new SucursalesController;
