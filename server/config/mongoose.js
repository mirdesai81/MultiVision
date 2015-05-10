var mongoose = require('mongoose');

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
    userName:String
});

var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err,collection){
    if(collection.length === 0){
        User.create({firstName : 'Mihir',lastName:'Desai',userName : 'mirdesai81'});
        User.create({firstName : 'John',lastName:'Doe',userName : 'jondoe'});
    }

})