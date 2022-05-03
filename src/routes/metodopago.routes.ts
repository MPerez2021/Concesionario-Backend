import { Router } from 'express'
import { pagosController  } from '../controllers/metodopago.controller'

const router = Router();

class PagoRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', pagosController.list);
        this.router.post('/', pagosController.create);
        this.router.get('/:id', pagosController.getOne);
        this.router.delete('/:id', pagosController.delete);
        this.router.put('/:id', pagosController.update);
    }
}

const pagoRoutes = new PagoRoutes();
export default pagoRoutes.router;