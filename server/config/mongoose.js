var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open',function callback(){
        console.log('multivision db connection opened....');
    });
}

var userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:String,
    salt:String,
    hashed_pwd:String,
    roles:[String]
});

userSchema.methods = {
    authenticate : function(passwordToMatch){
        return hashpwd(this.salt,passwordToMatch) === this.hashed_pwd;
    }
}

var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err,collection){
    if(collection.length === 0){
        //create user with sha1 password
        var salt, hash;
        salt = createSalt();
        hash = hashpwd(salt,'mirdesai81');
        User.create({firstName : 'Mihir',lastName:'Desai',userName : 'mirdesai81',salt:salt,hashed_pwd:hash,roles:['admin']});

        salt = createSalt();
        hash = hashpwd(salt,'jondoe');
        User.create({firstName : 'Jon',lastName:'Doe',userName : 'jondoe',salt:salt,hashed_pwd:hash,roles:[]});

        salt = createSalt();
        hash = hashpwd(salt,'jondoe1');
        User.create({firstName : 'Jon',lastName:'Doe',userName : 'jondoe1',salt:salt,hashed_pwd:hash});
    }

})

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashpwd(salt,pwd){
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
}