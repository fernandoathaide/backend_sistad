import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import ServiceUser from './modules/User/serviceUser';
const config = require('./config/env/config')();

class Auth {

    config(){
        let opts = {
            secretOrKey: config.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
        };
        passport.use(new Strategy(opts, (jwtPayload, done) =>{
            ServiceUser
                .getUserById(jwtPayload.id_user)
                .then(user =>{
                    if(user){
                        return done(null, {
                            id_user: user['id_user'],
                            email: user['email']
                        });
                    }
                    return done(null, false)
                })
                .catch(error => {
                    done(error, null)
                  });
        }));
        return {
            //Com a ES6 podemos fazer a declaração inline de uma ArrowFunction caso este possua apenas um comando.
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', {session: false})
          }
    }
    
}
export default new Auth();