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
exports.empleadosController = void 0;
const database_1 = require("../database");
class EmpleadosController {
    index(req, res) {
        res.send('Empleados');
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario } = req.body;
            const response = yield database_1.pool.query('INSERT INTO esquema1.empleados (nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', [nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario]);
            return res.json({
                message: 'Empleado ingresado con éxito',
                body: {
                    user: {
                        nombres,
                        apellidos,
                        direccion,
                        telefono,
                        email,
                        cedula,
                        genero,
                        fecha_ingreso,
                        salario
                    }
                }
            });
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.pool.query('Select * from esquema1.empleados');
            res.status(200).json(response.rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield database_1.pool.query('SELECT * FROM esquema1.empleados WHERE cedula = $1', [id]);
            return res.json(response.rows[0]);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario } = req.body;
            const response = yield database_1.pool.query('UPDATE esquema1.empleados SET nombres = $1, apellidos = $2, direccion = $3, telefono = $4, email = $5, cedula = $6, genero = $7, fecha_ingreso = $8, salario = $9 WHERE cedula = $10', [nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario, id]);
            res.json('Empleado Actualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            yield database_1.pool.query('DELETE FROM esquema1.empleados WHERE cedula = $1', [id]);
            res.json('Empleado Eliminado');
        });
    }
}
exports.empleadosController = new EmpleadosController;
