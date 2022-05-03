import { Router } from 'express'
import { proveedoresController } from '../controllers/proveedor.controller'

const router = Router();

class ProveedorRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', proveedoresController.list);
        this.router.post('/', proveedoresController.create);
        this.router.get('/:id', proveedoresController.getOne);
        this.router.delete('/:id', proveedoresController.delete);
        this.router.put('/:id', proveedoresController.update);
    }
}

const proveedoroutes = new ProveedorRoutes();
export default proveedoroutes.router;