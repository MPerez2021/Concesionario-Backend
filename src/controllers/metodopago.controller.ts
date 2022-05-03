import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class PagosController {
    public index(req: Request, res: Response) {
        res.send('Metodos de Pago')
    }

    public async create(req: Request, res: Response) {
        const { tipo, tiempo_pago } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.metodo_pago (tipo,tiempo_pago) values($1, $2)',[tipo,tiempo_pago])
        return res.json({
            message: 'Método de Pago ingresado con éxito',
            body: {
                user: {                 
                  tipo,
                  tiempo_pago
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.metodo_pago');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.metodo_pago WHERE tipo = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {tipo, tiempo_pago} = req.body;
        
        const response = await pool.query('UPDATE esquema1.metodo_pago SET tipo = $1, tiempo_pago =$2 WHERE tipo = $3',[tipo,tiempo_pago, id]);
        res.json('Método de Pago Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.metodo_pago WHERE tipo = $1', [id]);
        res.json('Método de Pago Eliminado');
    }
}
export const pagosController = new PagosController;