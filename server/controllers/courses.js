/**
 * Created by Mihir.Desai on 6/10/2015.
 */
var Course = require('mongoose').model('Course');

exports.getCourses = function(req,res){
  Course.find({}).exec(function(err,collection){
     console.log(collection);
     res.send(collection);
  });
};
