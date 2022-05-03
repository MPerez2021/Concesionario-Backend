import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class CarrosController {
    public index(req: Request, res: Response) {
        res.send('carros')
    }

    public async create(req: Request, res: Response) {
        const { descripcion, marca, color, precio, placa, modelo } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.carro (descripcion, marca, color, precio, placa, modelo) values($1, $2, $3, $4, $5, $6)',[descripcion, marca, color, precio, placa, modelo])
        return res.json({
            message: 'Carro ingresado con éxito',
            body: {
                user: {                 
                    descripcion,
                    marca,
                    color,
                    precio,
                    placa,
                    modelo
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.carro');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.carro WHERE placa = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const {id} = req.params
        const {descripcion, marca, color, precio, placa, modelo} = req.body;
        
        const response = await pool.query('UPDATE esquema1.carro SET descripcion = $1, marca = $2, color = $3, precio = $4, placa = $5, modelo = $6 WHERE placa = $7',[descripcion, marca, color, precio, placa, modelo, id]);
        res.json('Carro Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.carro WHERE placa = $1', [id]);
        res.json('Carro Eliminado');
    }
}
export const carrosController = new CarrosController;
