import { Request, Response } from 'express';
import UserController from './controllerUser';

class UserRoutes{

    constructor(){}

    indexUser(req: Request, res: Response){ 
        return UserController.getAllUser(req, res); 
    }
    createUser(req: Request, res: Response){ 
        return UserController.createUser(req, res); 
    }
    findOneUser(req: Request, res: Response){ 
        return UserController.getUserById(req, res); 
    }
    updateUser(req: Request, res: Response){ 
        return UserController.updateUser(req, res); 
    }
    destroyUser(req: Request, res: Response){ 
        return UserController.deleteUser(req, res); 
    }

}
export default new UserRoutes();