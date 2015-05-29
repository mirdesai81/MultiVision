/**
 * Created by Mihir.Desai on 5/6/2015.
 */
var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
module.exports = function(app){
    app.get('/api/users',auth.requiresRole('admin'),function(req,res,next){
       User.find({}).exec(function(err,collections){
           res.send(collections);
       });
    });

    app.get("/partials/*", function(req, res){
        console.log(req.params[0]);
        res.render('../../public/app/'+req.params[0]);
    });

    app.post('/login',auth.authenticate);

    app.post('/logout',function(req,res){
        req.logout();
        res.send();
    });

    app.get('*', function(req, res){
        res.render('index',{
            bootstrappedUser:req.user
        });
    });
};

