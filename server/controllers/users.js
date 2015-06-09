/**
 * Created by Mihir.Desai on 6/8/2015.
 */
var User = require("mongoose").model("User"),
encryption = require("../utilities/encryption");

exports.getUsers = function(req,res,next){
    User.find({}).exec(function(err,collections){
        res.send(collections);
    });
};

exports.createUser = function(req,res,next){
    var userData = req.body;
    console.log(userData);
    userData.userName = userData.userName.toLowerCase();
    userData.salt =  encryption.createSalt();
    userData.hashed_pwd = encryption.hashpwd(userData.salt,userData.password);
    User.create(userData,function(err,user){
        console.log("Create User Called!!");
        if(err){
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            console.log(err.toString());
            return res.send({reason:err.toString()});
        }
        req.logIn(user,function(err){
           if(err) {return next(err);}
           res.send(user);
        })
    })

};

exports.updateUser = function(req,res){
     var userUpdates = req.body;
    if(req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.userName;

    if(userUpdates.password && userUpdates.password.length > 0) {
        req.user.salt = encryption.createSalt();
        req.user.hashed_pwd = encryption.hashpwd(req.user.salt , userUpdates.password);
    }

    req.user.save(function(err){
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.user);
    });
};