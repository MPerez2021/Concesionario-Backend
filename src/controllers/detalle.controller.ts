import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class DetallesController {
    public index(req: Request, res: Response) {
        res.send('Detalles')
    }

    public async create(req: Request, res: Response) {
        const { placa_carro,numero_factura,precio,cantidad, precio_total } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.detalle (placa_carro,numero_factura,precio,cantidad, precio_total) values($1, $2, $3, $4, $5)',[placa_carro,numero_factura,precio,cantidad,precio_total])
        return res.json({
            message: 'Detalle ingresado con éxito',
            body: {
                user: {                 
                    placa_carro,
                    numero_factura,
                    precio,
                    cantidad,
                    precio_total                  
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.detalle');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.detalle WHERE cod_detalle = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        const {placa_carro,numero_factura,precio,cantidad,precio_total} = req.body;
        
        const response = await pool.query('UPDATE esquema1.detalle SET placa_carro = $1, numero_factura = $2, precio = $3, cantidad = $4, precio_total = $5 WHERE cod_detalle = $6',[placa_carro,numero_factura,precio,cantidad,precio_total, id]);
        res.json('Detalle Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.detalle WHERE cod_detalle = $1', [id]);
        res.json('Detalle Eliminado');
    }
}
export const detallesController = new DetallesController;