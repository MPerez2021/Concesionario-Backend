import { Request, Response } from 'express'
import { QueryResult } from 'pg'

import { pool } from '../database'


class FacturasController {
    public index(req: Request, res: Response) {
        res.send('Facturas')
    }

    public async create(req: Request, res: Response) {
        const { cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total } = req.body;
        const response: QueryResult = await pool.query('INSERT INTO esquema1.factura (cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total) values($1, $2, $3, $4, $5, $6, $7)',[cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total])
        return res.json({
            message: 'Factura ingresado con éxito',
            body: {
                user: {                 
                    cedula_cliente,
                    cedula_empleado,
                    metodo_pago,
                    nombre_sucursal,
                    num_factura,
                    fecha_emision,
                    valor_total
                }
            }
        })
    }

    public async list(req: Request, res: Response): Promise<void> {
        const response: QueryResult = await pool.query('Select * from esquema1.factura');
        res.status(200).json(response.rows);
    }

    public async getOne(req: Request, res:Response): Promise<any>{
        const {id} = req.params
        const response: QueryResult = await pool.query('SELECT * FROM esquema1.factura WHERE num_factura = $1',[id]);
        return res.json(response.rows[0]);
    }

   public async update (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        const {cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total} = req.body;
        
        const response = await pool.query('UPDATE esquema1.factura SET cedula_cliente = $1, cedula_empleado = $2, metodo_pago = $3, nombre_sucursal = $4, num_factura = $5, fecha_emision= $6, valor_total=$7 WHERE num_factura = $8',[cedula_cliente, cedula_empleado, metodo_pago, nombre_sucursal, num_factura, fecha_emision, valor_total, id]);
        res.json('Factura Actualizado');
    }

    public async delete (req: Request, res:Response): Promise<void>{
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM esquema1.factura WHERE num_factura = $1', [id]);
        res.json('Factura Eliminado');
    }
}
export const facturasController = new FacturasController;
