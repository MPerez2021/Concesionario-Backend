import { Router } from 'express'
import { empleadosController } from '../controllers/empleado.controller'

const router = Router();

class EmpleadoRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', empleadosController.list);
        this.router.post('/', empleadosController.create);
        this.router.get('/:id', empleadosController.getOne);
        this.router.delete('/:id', empleadosController.delete);
        this.router.put('/:id', empleadosController.update);
    }
}

const empleadoRoutes = new EmpleadoRoutes();
export default empleadoRoutes.router;