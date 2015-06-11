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

exports.getCoursesById = function(req,res){
  Course.findOne({_id : req.params.id}).exec(function(err,course){
      if(err){
          res.error(err);
      }
      if(course){
         res.send(course)
     }
  });
};

