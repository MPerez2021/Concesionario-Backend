import { Router } from 'express'
import { detallesController } from '../controllers/detalle.controller'

const router = Router();

class DetalleRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', detallesController.list);
        this.router.post('/', detallesController.create);
        this.router.get('/:id', detallesController.getOne);
        this.router.delete('/:id', detallesController.delete);
        this.router.put('/:id', detallesController.update);
    }
}

const detalleRoutes = new DetalleRoutes();
export default detalleRoutes.router;