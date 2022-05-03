import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class EmpleadosController {
    public index(req: Request, res: Response) {
        res.send('Empleados')
    }

    public async create(req: Request, res: Response) {
        const { nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.empleados (nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario) values($1, $2, $3, $4, $5, $6, $7, $8, $9)',[nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario])
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
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.empleados');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.empleados WHERE cedula = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario} = req.body;
        
        const response = await pool.query('UPDATE esquema1.empleados SET nombres = $1, apellidos = $2, direccion = $3, telefono = $4, email = $5, cedula = $6, genero = $7, fecha_ingreso = $8, salario = $9 WHERE cedula = $10',[nombres, apellidos, direccion, telefono, email, cedula, genero, fecha_ingreso, salario, id]);
        res.json('Empleado Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.empleados WHERE cedula = $1', [id]);
        res.json('Empleado Eliminado');
    }
}
export const empleadosController = new EmpleadosController;