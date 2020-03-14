import { Request, Response } from 'express';
import * as _ from 'lodash';
import ServiceUser from '../User/serviceUser'; 
import Handlers from '../../api/responses/handlers';   

class TokenRoutes {

  auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if(credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
      ServiceUser
        .getUserByEmail(credentials.email)
        .then(_.partial(Handlers.authSuccess, res, credentials))
        .catch(_.partial(Handlers.authFail, req, res));
    }
  }
}

export default new TokenRoutes();