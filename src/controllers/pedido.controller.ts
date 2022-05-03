import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class PedidosController {
    public index(req: Request, res: Response) {
        res.send('Pedidos')
    }

    public async create(req: Request, res: Response) {
        const { nombre_sucursal, nombre_prov, valor_total, vehiculo } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.pedido (nombre_sucursal, nombre_prov, valor_total, vehiculo) values($1, $2, $3, $4)',[nombre_sucursal, nombre_prov, valor_total, vehiculo])
        return res.json({
            message: 'Pedido ingresado con éxito',
            body: {
                user: {                 
                    nombre_sucursal,
                    nombre_prov,                    
                    valor_total,
                    vehiculo                 
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.pedido');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.pedido WHERE num_pedido = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {nombre_sucursal, nombre_prov, valor_total, vehiculo} = req.body;
        
        const response = await pool.query('UPDATE esquema1.pedido SET nombre_sucursal = $1, nombre_prov = $2, valor_total = $3, vehiculo = $4 WHERE num_pedido = $5',[nombre_sucursal, nombre_prov,  valor_total, vehiculo, id]);
        res.json('Pedido Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.pedido WHERE num_pedido = $1', [id]);
        res.json('Pedido Eliminado');
    }
}
export const pedidosController = new PedidosController;