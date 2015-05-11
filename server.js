var express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

/*var Schema = mongoose.Schema;*/
/*var messageSchema = mongoose.Schema({message: String}, {collection : 'messages'});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
console.log('Calling Mongodb');
Message.findOne().exec(function(err, messageDoc){
    if(err)
        console.log("Error:"+err);
    console.log(messageDoc);
    mongoMessage = messageDoc.message;
});*/

/*app.get("/partials/:partialPath", function(req , res){
   res.render('partials/'+ req.params.partialPath);
});*/


/*app.get("/partials/!*", function(req, res){
    console.log(req.params[0]);
    res.render('../../public/app/'+req.params[0]);
});

app.get('*', function(req, res){
    res.render('index');
});*/


/*
var port = process.env.PORT = process.env.PORT || 3000;*/
app.listen(config.port, function(){
    console.log("App listening on port " + config.port + "...");
})