import { Router } from 'express'
import { mantenimientosController } from '../controllers/mantenimiento.controller'

const router = Router();

class MantenimientoRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', mantenimientosController.list);
        this.router.post('/', mantenimientosController.create);
        this.router.get('/:id', mantenimientosController.getOne);
        this.router.delete('/:id', mantenimientosController.delete);
        this.router.put('/:id', mantenimientosController.update);
    }
}

const mantenimientoRoutes = new MantenimientoRoutes();
export default mantenimientoRoutes.router;