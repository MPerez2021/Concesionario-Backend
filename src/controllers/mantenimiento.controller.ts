import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class MantenimientosController {
    public index(req: Request, res: Response) {
        res.send('Mantenimientos')
    }

    public async create(req: Request, res: Response) {
        const { cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.mantenimiento (cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total) values($1, $2, $3, $4, $5, $6)',[cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total])
        return res.json({
            message: 'Mantenimiento ingresado con éxito',
            body: {
                user: {                 
                    cedula_cliente, 
                    cedula_empleado,                   
                    descripcion,
                    subtotal ,
                    iva,
                    valor_total
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.mantenimiento');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.mantenimiento WHERE cod_mant = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total} = req.body;
        
        const response = await pool.query('UPDATE esquema1.mantenimiento SET cedula_cliente = $1, cedula_empleado = $2, descripcion = $3, subtotal = $4, iva = $5, valor_total = $6 WHERE cod_mant = $7',[cedula_cliente, cedula_empleado, descripcion, subtotal, iva, valor_total, id]);
        res.json('Mantenimiento Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.mantenimiento WHERE cod_mant = $1', [id]);
        res.json('Mantenimiento Eliminado');
    }
}
export const mantenimientosController = new MantenimientosController;