import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class SucursalesController {
    public index(req: Request, res: Response) {
        res.send('Sucursales')
    }

    public async create(req: Request, res: Response) {
        const { nombre, telefono,direccion } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.sucursales (nombre, telefono,direccion) values($1, $2, $3)',[nombre, telefono,direccion])
        return res.json({
            message: 'Sucursal ingresada con éxito',
            body: {
                user: {                 
                    nombre, 
                    telefono,                   
                    direccion   
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.sucursales');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.sucursales WHERE nombre = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {nombre, telefono,direccion} = req.body;
        
        const response = await pool.query('UPDATE esquema1.sucursales SET nombre = $1, telefono = $2, direccion = $3 WHERE nombre = $4',[nombre, telefono,direccion, id]);
        res.json('Sucursal Actualizada');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.sucursales WHERE nombre = $1', [id]);
        res.json('Sucursal Eliminada');
    }
}
export const sucursalesController = new SucursalesController;