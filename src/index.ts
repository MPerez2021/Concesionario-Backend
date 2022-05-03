import express, {Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'


import indexRoutes from './routes/index'
import facturaRoutes from './routes/factura.routes'
import clientRoutes from './routes/client.routes'
import carroRoutes from './routes/carro.routes'
import empleadoRoutes from './routes/empleado.routes'
import metodopagoRoutes from './routes/metodopago.routes'
import pedidoRoutes from './routes/pedido.routes'
import proveedorRoutes from './routes/proveedor.routes'
import sucursalRoutes from './routes/sucursal.routes'
import mantenimientoRoutes from './routes/mantenimiento.routes'
import detalleRoutes from './routes/detalle.routes'

class Server {
    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }
    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/clientes',clientRoutes);
        this.app.use('/api/carros',carroRoutes);
        this.app.use('/api/facturas',facturaRoutes);
        this.app.use('/api/empleados',empleadoRoutes);
        this.app.use('/api/pagos',metodopagoRoutes);
        this.app.use('/api/pedidos',pedidoRoutes);
        this.app.use('/api/proveedores',proveedorRoutes);
        this.app.use('/api/sucursales',sucursalRoutes);
        this.app.use('/api/mantenimientos',mantenimientoRoutes);
        this.app.use('/api/detalles',detalleRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Serve on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

//midlewares