/**
 * Created by Mihir.Desai on 5/6/2015.
 */
var auth = require('./auth'),
    user = require('../controllers/users'),
    courses = require("../controllers/courses"),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
module.exports = function(app){
    // Users Routes
    app.get('/api/users',auth.requiresRole('admin'),user.getUsers);
    app.post('/api/users',user.createUser);
    app.put('/api/users',user.updateUser);

    //Courses Routes
    app.get("/api/courses",courses.getCourses);

    app.get("/partials/*", function(req, res){
        console.log(req.params[0]);
        res.render('../../public/app/'+req.params[0]);
    });

    app.post('/login',auth.authenticate);

    app.post('/logout',function(req,res){
        req.logout();
        res.send();
    });

    // Return 404 if api access is not defined
    app.get("/api/*" , function(req,res){
       res.send(404);
    });

    app.get('*', function(req, res){
        res.render('index',{
            bootstrappedUser:req.user
        });
    });
};

