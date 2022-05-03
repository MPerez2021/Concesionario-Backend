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
exports.clientsController = void 0;
const database_1 = require("../database");
class ClientsController {
    index(req, res) {
        res.send('clientes');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellidos, cedula, genero, email, telefono, direccion } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.cliente (nombres, apellidos, cedula, genero, email, telefono, direccion) values($1, $2, $3, $4, $5, $6, $7)', [nombres, apellidos, cedula, genero, email, telefono, direccion]);
            return res.json({
                message: 'Cliente ingresado con éxito',
                body: {
                    user: {
                        nombres,
                        apellidos,
                        cedula,
                        genero,
                        email,
                        telefono,
                        direccion
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.cliente');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.cliente WHERE cedula = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            const { nombres, apellidos, cedula, genero, email, telefono, direccion } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.cliente SET nombres = $1, apellidos = $2, cedula = $3, genero = $4, email = $5, telefono = $6, direccion = $7 WHERE cedula = $8', [nombres, apellidos, cedula, genero, email, telefono, direccion, id]);
            res.json('Cliente Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.cliente WHERE cedula = $1', [id]);
            res.json('Cliente Eliminado');
        });
    }
}
exports.clientsController = new ClientsController;
