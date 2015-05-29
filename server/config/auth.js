var passport = require('passport');

exports.authenticate = function(req,res,next){
    var auth = passport.authenticate('local',function(err,user){
        if(err){
            return next(err);
        }

        if(!user){
            console.log('User invalid');
            res.send({success:false});
        }

        req.logIn(user,function(err){
            if(err) {return next(err);}
            res.send({success:true,user:user});
        })
    });
    auth(req,res,next);
};

exports.requiresApiLogin = function(req,res,next){
   if(req.isAuthenticated()) {
       next();
   } else {
       res.status(403);
       res.end();
   }
};

exports.requiresRole = function(role) {
    return function(req,res,next){
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === - 1){
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};