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
        $('.result').click(function (e) {

            //获取数据
            var previewItem;
            if ($(e.target).hasClass("preview")) {
                previewItem = $(e.target);
            } else {
                previewItem = $(e.target).parents(".preview");
            }
            resourceId = previewItem.attr("class").split(" ")[2];
            name = previewItem.attr("class").split(" ")[3];
            type = previewItem.attr("class").split(" ")[4];
            uploader = previewItem.attr("class").split(" ")[5];
            downloads = previewItem.attr("class").split(" ")[6];

            //生存预览的html
            generateHtml();
            $('#resource_detail').html(myHtml);

            //绑定事件(必须在html生成以后);
            addEvent();

            //打开模态框
            inst.open();
        });
    })();

    function preview() {
        // inst.close();
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/resource/getUrl",
            data: JSON.stringify({ "fileid": resourceId, "urlType": 1 }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                alert("data");
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
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/resource/getUrl",
            data: JSON.stringify({ "fileid": resourceId, "urlType": 2 }),
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
    function addEvent() {
        //预览
        $(".previewBtn").click(function (e) {
            preview();
        })
        //下载
        $(".downloadBtn").click(function (e) {
            download();
        })
        //删除
    }


}.call(this));