/**
 * Created by Li on 2016/2/14.
 */
var server = require('socket.io')();
var fs = require('fs');
server.on('connection',function(socket){   // server listening

	socket.on("down",function(msg){
		 var str = {
			 data:JSON.parse(fs.readFileSync('./imgData/imgDown.json'))
		 }
		//console.log('str:'+str['data']);
		socket.emit("imgData",str['data']);
	});
	socket.on("move",function(msg){
		var str = {
			data:JSON.parse(fs.readFileSync('./imgData/imgMove.json'))
		}
		socket.emit("imgData",str['data']);
	});
	socket.on("up",function(msg){
		var str = {
			data:JSON.parse(fs.readFileSync('./imgData/imgUp.json'))
		}
		socket.emit("imgData",str['data']);
	});


	socket.on('disconnect',function(){ 	  // Event:  disconnect

	});
});

exports.listen = function(imgServer){
	console.log('socket opening');
	return server.listen(imgServer);    // listening
};