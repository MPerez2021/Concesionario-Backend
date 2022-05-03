import { Router } from 'express'
import { carrosController } from '../controllers/carro.controller'

const router = Router();

class CarroRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', carrosController.list);
        this.router.post('/', carrosController.create);
        this.router.get('/:id', carrosController.getOne);
        this.router.delete('/:id', carrosController.delete);
        this.router.put('/:id', carrosController.update);
    }
}

const carroRoutes = new CarroRoutes();
export default carroRoutes.router;