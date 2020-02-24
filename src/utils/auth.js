const LocalStrategy = require ('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const userModel = require('../../src/models/users/index');
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv');


dotenv.config();

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const jwtOpts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_PASSWORD
}

passport.use(new LocalStrategy(userModel.authenticate()))

passport.use(new JwtStrategy(jwtOpts,
    (jwtPayload, next) =>{
        userModel.findById(jwtPayload._id, (err, user) =>{
            if (err) return next(err, null)
            else if (user) return next(null, user)
            else return (null, false)
        })
    }))
// passport.use(new JwtStrategy(jwtOpts,(jwtPayload, callback)=>{
//     userModel.findById(jwtPayload._id, (err, user) =>{
//         if (err) return callback(err,false)
//         else if (user) return callback(null, user)
//         else return callback (null, false)
//     })
// }))

module.exports= {
    getToken: (userInfo) => jwt.sign(userInfo,process.env.TOKEN_PASSWORD, { expiresIn: 3600*24})
}