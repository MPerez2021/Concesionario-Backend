import { Router } from 'express'
import { pedidosController } from '../controllers/pedido.controller'

const router = Router();

class PedidoRoutes{
    public router: Router= Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', pedidosController.list);
        this.router.post('/', pedidosController.create);
        this.router.get('/:id', pedidosController.getOne);
        this.router.delete('/:id', pedidosController.delete);
        this.router.put('/:id', pedidosController.update);
    }
}

const pedidoRoutes = new PedidoRoutes();
export default pedidoRoutes.router;