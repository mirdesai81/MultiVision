var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development : {
        db : 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }
}