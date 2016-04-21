/**
 * Created by Administrator on 2016/4/20.
 */
var upload = function (target, url) {
    var zone = document.getElementById(target);
    var progressBarZone = document.createElement('div');
    progressBarZone.setAttribute('class','progress');
    var container = document.getElementById('fileList');
    var uploadFiles = [];
    if(!container){
        container = document.createElement('div');
        container.setAttribute('id','fileList');
        document.body.appendChild(container);
    }
    container.appendChild(progressBarZone);
    var lengFlag = 0;
    function sendFile(files) {
        if (!files || files.length < 1) {
            return;
        }

        var percent = document.createElement('div' );
        console.log( progressBarZone.getElementsByTagName('div'));
        if(lengFlag < 1) {
            progressBarZone.insertBefore(percent, progressBarZone.getElementsByTagName('div')[0]);
        }
        else {
            progressBarZone.appendChild(percent);
            lengFlag ++;
        }
        var formData = new FormData();             // 创建一个表单对象FormData
        formData.append( 'submit', '中文' );  // 往表单对象添加文本字段

        var fileNames = '' ;
        var file;
        for ( var i = 0; i < files.length; i++) {
            file = files[i];    // file 对象有 name, size 属性

            formData.append( 'file[' + i + ']' , file);       // 往FormData对象添加File对象

            fileNames += '《' + file.name + '》 ' ;
        }

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener( 'progress',
            function uploadProgress(evt) {
                // evt 有三个属性：
                // lengthComputable – 可计算的已上传字节数
                // total – 总的字节数
                // loaded – 到目前为止上传的字节数
                if (evt.lengthComputable) {
                    percent.innerHTML = fileNames + ' upload percent :' + Math.round((evt.loaded / evt.total)  * 100) + '%' ;
                }
            }, false); // false表示在事件冒泡阶段处理

        xhr.upload.onload = function() {
            percent.innerHTML = fileNames + '上传完成。' ;
        };

        xhr.upload.onerror = function(e) {
            percent.innerHTML = fileNames + ' 上传失败。' ;
        };

        xhr.open( 'post',url , true);
        console.log('send');
        xhr.send(formData);            // 发送表单对象。
    }
    var uploadMenu = function () {
        var m;
        function createMenu () {
            m = document.getElementById('uploadMenu')
            if(!m) {
                m = document.createElement('div');
                m.setAttribute('id', 'uploadMenu');
                var u = document.createElement('button');
                var n = document.createElement('button');
                u.innerHTML = "上传";
                n.innerHTML = "退出";
                m.appendChild(n);
                m.appendChild(u);
                u.addEventListener('click', function () {
                    m.style.display = 'none';
                    var list = document.getElementById('uploadFileList');
                    var files = [];
                    var options = list.getElementsByTagName('div');
                    var option;
                    for ( var i = 0; i < options.length; i++) {
                        option = options[i].getElementsByTagName('input')[0];
                        console.log(option.checked);
                        if(option.checked) {
                            files.push(uploadFiles[i]);
                            console.log(uploadFiles[i].name);
                        }
                    }
                    sendFile(files);
                    uploadFiles = [];
                    list.innerHTML = '';

                });
                n.addEventListener('click', function () {
                    m.style.display = 'none';
                    var list = document.getElementById('uploadFileList');
                    list.innerHTML = '';
                });
                document.getElementById('canvas_box').appendChild(m);
            }
            return m;
        }
        return createMenu();
    }
    var openUploadMenu = function (files) {
        if (!files || files.length < 1) {
            return;
        }
        var file;
        var menu = uploadMenu();
        menu.style.display = 'block';
        function showList () {
            var list;
            function createList () {
                list = document.getElementById('uploadFileList');
                if(!list){
                    var menu =uploadMenu();
                    list = document.createElement('div' );
                    list.setAttribute('id','uploadFileList');
                    menu.insertBefore(list,menu.getElementsByTagName('button')[0]);
                }
                return list;
            }

            return createList();
        }
        var list = showList();
        for ( var i = 0; i < files.length; i++) {
            var item = document.createElement('div' );
            var name = document.createElement('label' );
            var select = document.createElement('input' );
            select.setAttribute('type', 'checkbox');
            select.setAttribute('checked', 'true');
            //select.setAttribute('index', i);
            item.appendChild(name);
            item.appendChild(select);
            list.appendChild(item);
            file = files[i];    // file 对象有 name, size 属性
            name.innerHTML = '文件：' + file.name  ;
            uploadFiles.push(file);
        }

    }
    document.addEventListener("dragover", function(e) {
        e.stopPropagation();
        e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。
    }, false);

    document.addEventListener("drop", function(e) {
        e.stopPropagation();
        e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。
        console.log();
        if(e.target === zone ) {
            openUploadMenu(e.dataTransfer.files);
        }
    }, false);
}
