import { Router } from 'express'
import { facturasController } from '../controllers/factura.controller'

const router = Router();

class FacturaRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', facturasController.list);
        this.router.post('/', facturasController.create);
        this.router.get('/:id', facturasController.getOne);
        this.router.delete('/:id', facturasController.delete);
        this.router.put('/:id', facturasController.update);
    }
}

const facturaRoutes = new FacturaRoutes();
export default facturaRoutes.router;