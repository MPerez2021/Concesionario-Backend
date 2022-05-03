import { Router } from 'express'
import { sucursalesController } from '../controllers/sucursal.controller'

const router = Router();

class SucursalRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', sucursalesController.list);
        this.router.post('/', sucursalesController.create);
        this.router.get('/:id', sucursalesController.getOne);
        this.router.delete('/:id', sucursalesController.delete);
        this.router.put('/:id', sucursalesController.update);
    }
}

const sucursalRoutes = new SucursalRoutes();
export default sucursalRoutes.router;