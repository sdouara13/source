var express = require('express');
/*var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();*/
var multiparty = require('multiparty');
var util = require('util');

var router = express.Router();

var fs = require('fs');
/* GET home page. */
router.post('/', function(req, res) {
    var dir = './public/files/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
        var form = new multiparty.Form({uploadDir: dir});
       //上传完成后处理
       form.parse(req, function(err, fields, files) {
         var filesTmp = JSON.stringify(files,null,2);

         if(err){
               console.log('parse error: ' + err);
             } else {
                 if(files.inputFile){
                     console.log('parse files: ' + filesTmp);
                     var inputFile = files.inputFile[0];
                     var uploadedPath = inputFile.path;
                     var dstPath = './public/files/' + inputFile.originalFilename;
                     //重命名为真实文件名
                     fs.rename(uploadedPath, dstPath, function(err) {
                         if(err){
                             console.log('rename error: ' + err);
                         } else {
                             console.log('rename ok');
                         }
                     });
                 }
             }

         res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
         res.write('received upload:\n\n');
         res.end(util.inspect({fields: fields, files: filesTmp}));
      });

});

module.exports = router;
