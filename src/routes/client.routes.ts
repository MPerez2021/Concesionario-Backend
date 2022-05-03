import { Router } from 'express'
import { clientsController} from '../controllers/clientes.controller'
const router = Router();

class ClienteRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', clientsController.list);
        this.router.post('/', clientsController.create);
        this.router.get('/:id', clientsController.getOne);
        this.router.delete('/:id', clientsController.delete);
        this.router.put('/:id', clientsController.update);
    }
}

const clienteRoutes = new ClienteRoutes();
export default clienteRoutes.router;