/**
 * Created by Li on 2016/2/14.
 */
var server = require('socket.io')();
var fs = require('fs');
server.on('connection',function(socket){   // server listening

	socket.on("down",function(msg){
		//console.log(msg);
		var array = msg.split("\n")[0].split(' ');
		var str;
		//console.log(array[4]);
		str = fs.readFileSync('./imgData/txt/(' + array[4] + ').txt');
		//console.log('str:'+str['data']);
		socket.emit("imgData",str.toString());
	});
	socket.on("move",function(msg){
		var array = msg.split("\n")[0].split(' ');
		var str;
		str = fs.readFileSync('./imgData/txt/(' + array[4] + ').txt');
		socket.emit("imgData",str.toString());
	});
	socket.on("up",function(msg){
		var str = fs.readFileSync('./imgData/txt/(' + parseInt(100*Math.random()) + ').txt');
		socket.emit("imgData",str.toString());
	});


	socket.on('disconnect',function(){ 	  // Event:  disconnect

	});
});

exports.listen = function(imgServer){
	console.log('socket opening');
	return server.listen(imgServer);    // listening
};