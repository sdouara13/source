var logcat = function (socket) {
    var output = document.createElement('p');
    document.body.appendChild(output);
    socket.on('logcat', function (msg) {
        output.innerHTML = msg;
    })
}