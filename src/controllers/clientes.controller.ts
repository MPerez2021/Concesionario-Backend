import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class ClientsController {
    public index(req: Request, res: Response) {
        res.send('clientes')
    }

    public async create(req: Request, res: Response) {
        const { nombres, apellidos, cedula, genero, email, telefono, direccion } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.cliente (nombres, apellidos, cedula, genero, email, telefono, direccion) values($1, $2, $3, $4, $5, $6, $7)',[nombres, apellidos, cedula, genero, email, telefono, direccion])
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
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.cliente');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.cliente WHERE cedula = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        const {nombres, apellidos, cedula, genero, email, telefono, direccion} = req.body;
        
        const response = await pool.query('UPDATE esquema1.cliente SET nombres = $1, apellidos = $2, cedula = $3, genero = $4, email = $5, telefono = $6, direccion = $7 WHERE cedula = $8',[nombres,apellidos,cedula,genero,email,telefono,direccion, id]);
        res.json('Cliente Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.cliente WHERE cedula = $1', [id]);
        res.json('Cliente Eliminado');
    }
}
export const clientsController = new ClientsController;