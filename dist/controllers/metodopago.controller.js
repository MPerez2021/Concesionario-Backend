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
exports.pagosController = void 0;
const database_1 = require("../database");
class PagosController {
    index(req, res) {
        res.send('Metodos de Pago');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, tiempo_pago } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.metodo_pago (tipo,tiempo_pago) values($1, $2)', [tipo, tiempo_pago]);
            return res.json({
                message: 'Método de Pago ingresado con éxito',
                body: {
                    user: {
                        tipo,
                        tiempo_pago
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.metodo_pago');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.metodo_pago WHERE tipo = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo, tiempo_pago } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.metodo_pago SET tipo = $1, tiempo_pago =$2 WHERE tipo = $3', [tipo, tiempo_pago, id]);
            res.json('Método de Pago Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.metodo_pago WHERE tipo = $1', [id]);
            res.json('Método de Pago Eliminado');
        });
    }
}
exports.pagosController = new PagosController;
