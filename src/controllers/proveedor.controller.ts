import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class ProveedoresController {
    public index(req: Request, res: Response) {
        res.send('Proveedores')
    }

    public async create(req: Request, res: Response) {
        const { nombre, email,direccion } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.proveedores (nombre, email,direccion) values($1, $2, $3)',[nombre, email,direccion])
        return res.json({
            message: 'Proveedor ingresado con éxito',
            body: {
                user: {                 
                    nombre, 
                    email,                   
                    direccion   
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.proveedores');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.proveedores WHERE nombre = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {nombre, email,direccion} = req.body;
        
        const response = await pool.query('UPDATE esquema1.proveedores SET nombre = $1, email = $2, direccion = $3 WHERE nombre = $4',[nombre, email,direccion, id]);
        res.json('Proveedor Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.proveedor WHERE nombre = $1', [id]);
        res.json('Proveedor Eliminado');
    }
}
export const proveedoresController = new ProveedoresController;