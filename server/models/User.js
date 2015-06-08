/**
 * Created by Mihir.Desai on 6/8/2015.
 */

var mongoose = require('mongoose'),
    encryption = require("../utilities/encryption");




var userSchema = mongoose.Schema({
    firstName:{type:String , required: '{PATH} is required!'},
    lastName:{type:String , required: '{PATH} is required!'},
    userName:{ type : String, required: '{PATH} is required!' , unique : true},
    salt:{type:String , required: '{PATH} is required!'},
    hashed_pwd:{type:String , required: '{PATH} is required!'},
    roles:[String]
});

userSchema.methods = {
    authenticate : function(passwordToMatch){
        return encryption.hashpwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err,collection){
        if(collection.length === 0){
            //create user with sha1 password
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashpwd(salt,'mirdesai81');
            User.create({firstName : 'Mihir',lastName:'Desai',userName : 'mirdesai81',salt:salt,hashed_pwd:hash,roles:['admin']});

            salt = encryption.createSalt();
            hash = encryption.hashpwd(salt,'jondoe');
            User.create({firstName : 'Jon',lastName:'Doe',userName : 'jondoe',salt:salt,hashed_pwd:hash,roles:[]});

            salt = encryption.createSalt();
            hash = encryption.hashpwd(salt,'jondoe1');
            User.create({firstName : 'Jon',lastName:'Doe',userName : 'jondoe1',salt:salt,hashed_pwd:hash});
        }

    })
};

exports.createDefaultUser = createDefaultUsers;
