(function () {
    var help = $('#help');//点击进入回答
    var save = $('.save');//点击提交回答
    var cancel = $('.cancel');//点击取消回答
    var anstop = $('#anstop');//回答的显示框
    var myans = $('#myans');//我的回答
    var best = $('.best');//设置最佳回答
    var closeq = $('#closeq');//关闭问题
    var like = $('.button');//点赞回答
    var bestanswer = undefined;//最佳回答
    var description = undefined; //问题描述
    var time = undefined;// 提问时间
    var details = undefined;//  答案
    var count_like = undefined;//  点赞数
    var name = undefined;// 回答者名
    var usertype = undefined;//  回答者身份
    var atime = undefined;// 回答时间
    var id = undefined;// 问题id
    var qid = undefined;// 提出问题者的id
    var myanswer = undefined;// 回答内容
    var sid = undefined;// 登陆者的id
    var type = undefined;//登陆者type
    var ii=0;

    like.click(function () {
        var Id =$(e.target).id;
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/like",
            data: JSON.stringify({ "answerId": Id }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    result.answers[k].count_like++; 
                    like.disabled='disabled';
                }
            }
        });
    })


    best.click(function () {
        var Id =$(e.target).id;
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/chooseBest",
            data: JSON.stringify({ "id": id, "answerId": Id }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("最佳答案设置成功！"); 
                    button1.style="display:none;"; 
                }
            }
        });
    })

    //关闭问题
    closeq.click(function () {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/closeQuestion",
            data: JSON.stringify({ "questionId": id,  }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("问题已关闭！"); 
                    close.disabled = true;
                    var textdelete = document.createElement("del");
                    textdelete.innerText = "已关闭";
                    close.appendChild(textdelete);
                }
            }
        });
    })

     //提取url参数
     function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    id = getUrlParam("index");
    //alert(index);

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
            data: JSON.stringify({ "questionId": id, "answerDetails": myans }),
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


    rendera();
    
//渲染后台返回的结果
function rendera() {
    var result = new Array(10);
    var len = result.length;
    for (var r = 0; r < len; r++) {
        result[r] = r;
    }
    $.ajax({
        type: 'post',
        url: "http://localhost:8080/QAComm/QA/time",
        data: JSON.stringify({"questionId": id}),
        contentType: "application/json;charset=UTF-8",
        dataType: "json", //预期服务器返回类
        success: function (data) {
            if (data.status != 200) {
                alert(data.msg);
            } else {
                [...result]=data.data;//把json的data取出来
    $('#qtitle').append(result.question.title);
    $('#qdesc').append(result.question.description);
    $('#qtime').append(result.question.time);
    for (var k = 0; k < len; k++) {
        //alert(len);
        var all = document.createElement("div");
        all.className = "mdui-rowa";
        var all1 = document.createElement("i");
        all1.className = "mdui-icon material-icons";
        all1.style = "color:  rgb(1,102,144)";
        all1.innerText = "flag";
        var all2 = document.createElement("span");
        all2.style ="color: #016690";
        all2.innerText = "最佳答案";
        all.appendChild(all1);
        all.appendChild(all2);
        var d = document.createElement("div");
        d.className = "mdui-rowa";
        var div = document.createElement("div");
        div.className = "mdui-rowa";
        div.innerText = result.answers[k].details;//答案answer
        var div1 = document.createElement("div");
        div1.className = "mdui-rowa";
        var button = document.createElement("button");
        button.className = "mdui-btn-group button";
        button.style = "color: rgb(1,102,144);font-size: 15px;border-radius: 5px";
        var i = document.createElement("i");
        i.className = "mdui-icon material-icons";
        i.innerText = "thumb_up";
        var span = document.createElement("span");
        span.innerText = result.answers[k].count_like;//点赞数count
        button.id="answerID";
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
        button2.innerText = result.answers[k].usertype;//回答者身份tag
        button2.style = "border-color: rgb(43,51,59);color: rgb(43,51,59);font-size: 15px;border-radius: 5px;left:15px;";
        var span3 = document.createElement("span");
        span3.className = "mdui-col-offset-md-1";
        span3.innerText =  result.answers[k].time;//回答时间time
        span2.appendChild(button2);
        div1.appendChild(span1);
        div1.appendChild(span2);
        div1.appendChild(span3);
        var div2 = document.createElement("div");
        div2.className = "mdui-rowc";
        var div3 = document.createElement("div");
        div3.className = "mdui-divider-dark";
        var button1 = document.createElement("button");
        button1.className="mdui-btn-dense mdui-btn best";
        button1.style="position: relative;left:600px;top:-180px;color:#016690;"
        button1.id="answerID";
        button1.innerText="设置为最佳答案";
        if (document.cookie != "") {
             sid = $.cookie("id").replace(/\"/g, "");
             type = $.cookie("type").replace(/\"/g, "");
            } 
        if(qid!=sid)button1.style="display:none";
        div2.appendChild(div3);
        if(bestanswer!=null&&ii==0){anstop.append(all);ii++;}//如果有最佳答案
        if(bestanswer==null){ anstop.append(button1);}//如果没有最佳答案
        anstop.append(d);
        anstop.append(div);
        anstop.append(div1);
        anstop.append(div2);
    }

}
}})
}
}.call(this));



