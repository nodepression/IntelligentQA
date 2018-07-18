(function () {
    var help = $('#help');//点击进入回答
    var save = $('.save');//点击提交回答
    var cancel = $('.cancel');//点击取消回答
    var anstop = $('#anstop');//回答的显示框
    var myans = $('#myans');//我的回答
    var description = undefined; //问题描述
    var time = undefined;// 提问时间
    var answer = undefined;//  答案
    var count = undefined;//  点赞数
    var name = undefined;// 回答者名
    var tag = undefined;//  回答者身份
    var atime = undefined;// 回答时间
    //id 问题id
    var qid = undefined;// 提出问题者的id
    var myanswer = undefined;// 回答内容
    var sid = undefined;// 登陆者的id

    //清空回答框
    cancel.click(function () {
        clear();
    })
    function clear() {
       myans.val("");
    }

    //提交答案
    save.click(function () {
        saveans();
    })
    function saveans() {
        myanswer = myans.val();   //我的回答
        alert(myanswer);
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/replyques",
            data: JSON.stringify({ "id": id, "myanswer": myans }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("答案提交成功！");   
                }
            }
        });
          
        myans.val("");
    }

    //回答问题的对话框
    var ans = new mdui.Dialog('#help_dialog', { 'overlay': true, 'destroyOnClosed': true });
    help.click(function () {
        ans.open();
    })

    //关闭问题
    close = document.getElementById("closeq");
    close.onclick = function () {
        close.disabled = true;
        var textdelete = document.createElement("del");
        textdelete.innerText = "已关闭";
        close.appendChild(textdelete);
    }

    rendera();
}.call(this));


//渲染后台返回的结果
function rendera() {
    var result = new Array(10);
    var len = result.length;
    for (var r = 0; r < len; r++) {
        result[r] = r;
    }
    // $.ajax({
    //     type: 'post',
    //     url: "http://localhost:8080/QAComm/showans",
    //     data: JSON.stringify({"id": id}),
    //     contentType: "application/json;charset=UTF-8",
    //     dataType: "json", //预期服务器返回类
    //     success: function (data) {
    //         if (data.status != 200) {
    //             alert(data.msg);
    //         } else {
        $('#qtitle').append("a");
        $('#qdesc').append("description");
        $('#qtime').append("time");

    //             [...result]=data.data;//把json的data取出来
    for (var k = 0; k < len; k++) {
        //alert(len);
        var div = document.createElement("div");
        div.className = "mdui-rowa";
        div.innerText = result[k];//答案answer
        var div1 = document.createElement("div");
        div1.className = "mdui-rowa";
        var button = document.createElement("button");
        button.className = "mdui-btn-group button";
        button.style = "color: rgb(1,102,144);font-size: 15px;border-radius: 5px";
        var i = document.createElement("i");
        i.className = "mdui-icon material-icons";
        i.innerText = "thumb_up";
        var span = document.createElement("span");
        span.innerText = "count";//点赞数count
        button.appendChild(i);
        button.appendChild(span);
        div1.appendChild(button);
        var span1 = document.createElement("span");
        span1.innerText = "name";//回答者名name
        span1.style = "margin-left:380px;";
        var span2 = document.createElement("span");
        span2.className = "mdui-col-offset-md-1"
        var button2 = document.createElement("button");
        button2.className = "mdui-btn-group button";
        button2.innerText = "tag";//回答者身份tag
        button2.style = "border-color: rgb(43,51,59);color: rgb(43,51,59);font-size: 15px;border-radius: 5px;left:15px;";
        var span3 = document.createElement("span");
        span3.className = "mdui-col-offset-md-1";
        span3.innerText = "time";//回答时间time
        span2.appendChild(button2);
        div1.appendChild(span1);
        div1.appendChild(span2);
        div1.appendChild(span3);
        var div2 = document.createElement("div");
        div2.className = "mdui-rowc";
        var div3 = document.createElement("div");
        div3.className = "mdui-divider-dark";
        div2.appendChild(div3);
        anstop.appendChild(div);
        anstop.appendChild(div1);
        anstop.appendChild(div2);
    }

//}
// }})
}

