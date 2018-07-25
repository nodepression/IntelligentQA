(function () {

    //预览需要的数据
    var name;
    var type;
    var uploader;
    var downloads;
    var resourceId;
    var url;
    var myHtml;
    function generateHtml() {
        myHtml = ` <center>资源详情</center>
        <div class="mdui-typo">
            <hr/>
        </div>

        <div class="resource_info">
            文件名 :
            <span class="fileName">${name}</span>
        </div>
        <div class="resource_info">
            文件类型 :
            <span class="fileType">${type}</span>
        </div>
        <div class="resource_info">
            上传者 :
            <span class="uploader">${uploader}</span>
        </div>
        <div class="resource_info">
            下载次数 :
            <span class="downloads">${downloads}</span>
        </div>

        <div class="mdui-typo">
            <hr/>
        </div>
        <button class="mdui-btn deleteBtn">删除</button>
        <div class="mdui-btn downloadBtn">下载</div>
        <button class="mdui-btn previewBtn">预览</button>`;
    }

    var inst = new mdui.Dialog('#resource_detail', { 'overlay': true, 'destroyOnClosed': true });
    (function init() {
        
        $('#rtable').click(function (e) {

            //获取数据
            var previewItem;
            if ($(e.target).hasClass("mypreview")) {
                previewItem = $(e.target);
            } else {
                previewItem = $(e.target).parents(".mypreview");
            }
            resourceId = previewItem.attr("id");
            name = previewItem.find(".title").text();
            type = previewItem.find(".type").attr("class").split(" ")[1];
            time = previewItem.find(".time").text();
            uploader =previewItem.attr("class").split(" ")[2];
            downloads = previewItem.find(".downloads").children("span").text();

            //生存预览的html
            generateHtml();
            $('#resource_detail').html(myHtml);
            getStatus();

            //绑定事件(必须在html生成以后);
            addEvent();

            //打开模态框
            inst.open();
        });
    })();

    function preview() {
        inst.close();
        $.ajax({
            type: 'post',
            url: prefix + "/resource/getUrl",
            data: JSON.stringify({ "fileid": resourceId, "urlType": 1 }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    url = data.data;

                    if (type == "pdf") {
                        window.open("http://" + url);
                    } else if (type == "mp4") {
                        window.open("http://" + url);
                    } else {
                        window.open("https://view.officeapps.live.com/op/view.aspx?src=" + url);
                    }
                }
            }
        });
    }

    function download() {
        inst.close();
        $.ajax({
            type: 'post',
            url: prefix + "/resource/getUrl",
            data: JSON.stringify({ "id": resourceId, "urlType": 2 }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    url = data.data;
                    $(".realDownlaod").attr("href", "http://" + url);
                    $(".realDownlaod")[0].click();
                }
            }
        });
    }

    function deleteFile() {
        inst.close();
        $.ajax({
            type: 'post',
            url: prefix + "/resource/deletefile",
            data: JSON.stringify({ "fileid": resourceId }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    // alert(data.msg);
                } else {
                    alert("成功删除文件");
                }
            }
        });
    }

    
    //获取用户身份,决定是否显示删除按钮
    function getStatus() {
        if (document.cookie != "") {
            var status = $.cookie("type").replace(/\"/g, "");
            if(status!=2){
                $(".deleteBtn").hide();
            }
        }else{
            $(".deleteBtn").hide();
        }
    };


    function addEvent() {
        //预览
        $(".previewBtn").click(function () {
           preview();
        })
        //下载
        $(".downloadBtn").click(function () {
            download();
        })
        //删除
        $(".deleteBtn").click(function () {
            deleteFile();
        })
    }


}.call(this));