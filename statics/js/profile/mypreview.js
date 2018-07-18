(function () {

    //预览需要的数据
    var name;
    var type;
    var time;
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
                    <span class="downloads">${time}</span>
                    </div>
                   
                    <div class="resource_info">
                        <span class="downloads">${downloads}</span>
                    </div>

                    <div class="mdui-typo">
                        <hr/>
                    </div>
                    <button class="mdui-btn deleteBtn">删除</button>
                    <a href="#" class="mdui-btn downloadBtn">下载</a>
                    <button class="mdui-btn previewBtn">预览</button>`;
    }

    (function init() {
        var inst = new mdui.Dialog('#resource_detail', { 'overlay': true, 'destroyOnClosed': true });
        $('#rtable').click(function (e) {

            //获取数据
            var previewItem;
            if ($(e.target).hasClass("mypreview")) {
                previewItem = $(e.target);
            } else {
                previewItem = $(e.target).parents(".mypreview");
            }
            resourceId = previewItem.attr("class").split(" ")[2];
            name = previewItem.find(".title").text();
            type = previewItem.find(".type").text();
            time = previewItem.find(".time").text();
            downloads = previewItem.find(".downloads").text();

            //生存预览的html
            generateHtml();
            $('#resource_detail').html(myHtml);

            //绑定事件(必须在html生成以后);
            addEvent();

            //打开模态框
            inst.open();
        });
    })();

    function preview(e) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/resource/getUrl",
            data: JSON.stringify({ "id": resourceId, "urlType": 1 }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    url = data.data.url;
                    if(type=="pdf"){
                        window.open("url");
                    }
                    if(type=="vedio")
                    {
                        window.open("url");
                    }else{
                        window.open("https://view.officeapps.live.com/op/view.aspx?src=" + url);
                    }
                }
            }
        });
    }

    function download(e) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/resource/getUrl",
            data: JSON.stringify({ "id": resourceId, "urlType": 2 }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    url = data.data.url;
                    $('.downloadBtn').attr("href", url);
                }
            }
        });
    }
    function addEvent() {
        //预览
        $(".previewBtn").click(function (e) {
            window.open("https://view.officeapps.live.com/op/view.aspx?src=http://pbmqrl67c.bkt.clouddn.com/testWord.docx");
        })
        //下载
        $(".downloadBtn").click(function (e) {
            download(e);
        })
        //删除
    }


}.call(this));