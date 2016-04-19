/**
 * Created by Li on 2016/2/14.
 */
var server = require('socket.io')();
var fs = require('fs');
var images = require("images");

server.on('connection',function(socket){   // server listening

	socket.on("down",function(msg){
		//console.log(msg);
		var array = msg.split("\n")[0].split(' ');
		var str;
		images('./imgData/img/(' + array[4] + ').jpg')                     //Load image from file
		//加载图像文件
			.size(400)                          //Geometric scaling the image to 400 pixels width
			//
			.save("./imgData/img/(" + array[4] + ")-output.jpg", {               //Save the image to a file,whih quality 50
				quality : 50                    //保存图片到文件,图片质量为50
			});

		//str = fs.readFileSync('./imgData/txt/(' + array[4] + ').txt');
		str = fs.readFileSync('./imgData/img/(' + array[4] + ')-output.jpg').toString('base64');
		//console.log('str:'+str['data']);
		socket.emit("imgData",str.toString());
	});
	socket.on("move",function(msg){
		var array = msg.split("\n")[0].split(' ');
		var str;

		images('./imgData/img/(' + array[4] + ').jpg')                     //Load image from file
		//加载图像文件
			.size(400)                          //Geometric scaling the image to 400 pixels width
			//
			.save("./imgData/img/(" + array[4] + ")-output.jpg", {               //Save the image to a file,whih quality 50
				quality : 50                    //保存图片到文件,图片质量为50
			});

		//str = fs.readFileSync('./imgData/txt/(' + array[4] + ').txt');
		str = fs.readFileSync('./imgData/img/(' + array[4] + ')-output.jpg').toString('base64');
		socket.emit("imgData",str.toString());
	});
	socket.on("up",function(msg){
		var number = parseInt(100*Math.random());
		images('./imgData/img/(' +number + ').jpg')                     //Load image from file
		//加载图像文件
			.size(400)                          //Geometric scaling the image to 400 pixels width
			//
			.save("./imgData/img/(" + number + ")-output.jpg", {               //Save the image to a file,whih quality 50
				quality : 50                    //保存图片到文件,图片质量为50
			});

		//var str = fs.readFileSync('./imgData/txt/(' + number + ').txt');
		str = fs.readFileSync('./imgData/img/(' +number + ').jpg').toString('base64');
		socket.emit("imgData",str.toString());
	});


	socket.on('disconnect',function(){ 	  // Event:  disconnect

	});
});

exports.listen = function(imgServer){
	console.log('socket opening');
	return server.listen(imgServer);    // listening
};