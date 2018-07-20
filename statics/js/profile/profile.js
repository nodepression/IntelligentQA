(function () {
    // 前后端传输数据
    var password = undefined;
    var newpassword = undefined;
    var repassword = undefined;
    var title = undefined;
    var time = undefined;
    var count = undefined;
    var status = undefined;

    // 程序用到的辅助数据
    var pass = false; //密码格式
    var repass = true //再次输入密码的格式
    var passEqual = false; //两次密码是否相等
    //dom obj
    var submit = $('#submit');     //提交按钮,点击发送请求。
    var qpre = $('#qpre');  // 上翻页
    var qnext = $('#qnext');//下翻页
    var qtable = $('#qtable');
    var rpre = $('#rpre');  // 上翻页
    var rnext = $('#rnext');//下翻页
    var rtable = $('#rtable');
    var index = 1; //当前位于第几页
    var index1 = 1; //当前位于第几页
    var num = 4; //一页最多显示多少个
    var qresult = new Array(10);
    var rresult = new Array(7);
    var len = qresult.length;
    var rlen = rresult.length;
    var lastIndex = Math.floor(len / num) + 1; //最多显示到第几页
    var rlastIndex = Math.floor(rlen / num) + 1; //最多显示到第几页
    for (var r = 0; r < rlen; r++) {
        rresult[r] = r;
    }
    for (var k = 0; k < len; k++) {
        qresult[k] = k;
    }
    submit.click(function () {
        changepassword();
    })
    //上一页
    qpre.click(function () {
        quespre();
    })
    //下一页
    qnext.click(function () {
        quesnext();
    })
    //上一页
    rpre.click(function () {
        respre();
    })
    //下一页
    rnext.click(function () {
        resnext();
    })

    function quesnext() {
        qtable.empty()
        if (index == 1) {  //当前是第一页
            qpre.css("visibility", "visible");
        }
        if (index == (lastIndex - 1)) //当前是倒数第二页
        {
            qnext.css("visibility", "hidden");
        }
        index++;
        renderq();

    }
    function resnext() {
        rtable.empty()
        if (index1 == 1) {  //当前是第一页
            rpre.css("visibility", "visible");
        }
        if (index1 == (rlastIndex - 1)) //当前是倒数第二页
        {
            rnext.css("visibility", "hidden");
        }
        index1++;
        renderr();

    }

    function quespre() {
        qtable.empty()
        if (index == lastIndex) {  //当前是最后一页
            qnext.css("visibility", "visible");
        } if (index == 2) //当前是第二页
        {
            qpre.css("visibility", "hidden");
        }
        index--;
        renderq();

    }

    function respre() {
        rtable.empty()
        if (index1 == rlastIndex) {  //当前是最后一页
            rnext.css("visibility", "visible");
        } if (index1 == 2) //当前是第二页
        {
            rpre.css("visibility", "hidden");
        }
        index1--;
        renderr();
    }

    function changepassword() {
        if (!pass || !repass) {
            alert("密码格式不正确(最少8位)");
        }
        else {
            if (!passEqual) {
                alert("两次密码不一致");
            }
            else {
                password = $("#password").val();   //原密码
                newpassword = $("#newpassword").val();   //新密码
                // alert(password + " " + newpassword + " " + repassword);
                $.ajax({
                    type: 'post',
                    url: "211.87.230.35:8080/profile/modifyPass",
                    data: JSON.stringify({ "password": password, "newpassword": newpassword }),
                    contentType: "application/json;charset=UTF-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json", //预期服务器返回类
                    success: function (data) {
                        if (data.status != 200) {
                            alert(data.msg);
                        } else {
                            alert("密码修改成功！");
                        }
                    }
                });
            }
        }
    }

    //获取新密码并验证格式
    $('#newpassword').change(function (e) {
        newpassword = $(e.target).val();
        if (newpassword.length < 8) {
            pass = false;
            alert("密码最少8位");
        } else {
            pass = true;
        }
    })
    //获取第二次密码并验证两次密码是否相等
    $('#repassword').change(function (e) {
        repassword = $(e.target).val();
        if (repassword.length < 8) {
            repass = false;
            alert("密码最少8位");
        } else {
            repass = true;
            if (newpassword != repassword) {
                passEqual = false;
                alert("两次密码不一致");
            } else {
                passEqual = true;
            }
        }
    })



    //初始化
    function initq() {
        qpre.css("visibility", "hidden");
        if (len <= num) {
            qnext.css("visibility", "hidden");
        }
        renderq();

    }
    initq();

    //初始化
    function initr() {
        rpre.css("visibility", "hidden");
        if (rlen <= num) {
            rnext.css("visibility", "hidden");
        }
        renderr();

    }
    initr();

    //渲染后台返回的结果
    function renderq() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/profile/myQuestion",
            data: JSON.stringify({}),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...qresult]=data.data;//把json的data取出来
                    if(qlen<=4)
            {
                $('.page i').css("display","none");
            }
        for (var i = (index - 1) * num; i < (index - 1) * num + num; i++) {
            if (i >= len)
                break;
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.className = "td";
            td.id=qresult[i].id;//qresult[i].id
            var div = document.createElement("div");
            div.style = "line-height: 60px";
            var row = document.createElement("div");
            var text = document.createElement("div");
            text.className = "mdui-col-xs-8 font1";
            text.innerText = qresult[i].title;// qresult[i].title;
            var text1 = document.createElement("div");
            text1.className = "mdui-col-xs-3";
            if (qresult[i].status = 0) {
                text1.innerText = "回答数目：" + qresult[i].count;//qresult[i].count_answer;
            }
            if (qresult[i].status = 1) {
                var textdelete = document.createElement("del");
                text1.style = "text-align:right";
                textdelete.innerText = "已关闭";
                text1.appendChild(textdelete);
            }
            var row2 = document.createElement("div");
            var text2 = document.createElement("div");
            text2.className = "mdui-col-xs-9";
            text2.innerText = "发布时间：" + qresult[i].time;//qresult[i].time;
            var text3 = document.createElement("div");
            text3.className = "mdui-col-xs-1 font1 mdui-col-offset-xs-1";
            row.appendChild(text);
            row.appendChild(text1);
            row2.appendChild(text2);
            row2.appendChild(text3);
            div.appendChild(row);
            div.appendChild(row2);
            td.appendChild(div);
            tr.appendChild(td);
            qtable.append(tr);
        }
        $('.index').text(index);
    }
    }})
    }

    //点击问题跳转
    $('#qtable').click(function(e){
        qid = this.id;
        var tagItem;
        if ($(e.target).hasClass("td")) {
            tagItem = $(e.target);
        } else {
            tagItem = $(e.target).parents(".td");
        }
        //  //获取问题id
         qid = tagItem.attr("id");
         window.location.href='../QAComm/answer.html?index='+ qid;
    })

    //渲染后台返回的结果
    function renderr() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/profile/myResource",
            data: JSON.stringify({}),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...rresult]=data.data;//把json的data取出来
                    if(rlen<=4)
            {
                $('.page i').css("display","none");
            }
        for (var i = (index1 - 1) * num; i < (index1 - 1) * num + num; i++) {
            if (i >= rlen)
                break;
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.className = "td mypreview";
            var div = document.createElement("div");
            div.style = "line-height: 60px";
            var row = document.createElement("div");
            row.style = "height:50px";
            if (rresult[i].type = 0)//word
            {
                var pic = document.createElement("img");
                pic.src = "../../statics/images/word.png";
                pic.className = "mdui-col-xs-1 type";
            }
            if (rresult[i].type = 1)//ppt
            {
                var pic = document.createElement("img");
                pic.src = "../../statics/images/ppt.png";
                pic.className = "mdui-col-xs-1 type";
            }
            if (rresult[i].type = 2)//pdf
            {
                var pic = document.createElement("img");
                pic.src = "../../statics/images/pdf.png";
                pic.className = "mdui-col-xs-1 type";
            }
            if (rresult[i].type = 3)//video
            {
                var pic = document.createElement("img");
                pic.src = "../../statics/images/mp4.png";
                pic.className = "mdui-col-xs-1 type";
            }
            var pic = document.createElement("img");
            pic.src = "../../statics/images/mp4.png";
            pic.className = "mdui-col-xs-1 type";
            var text = document.createElement("div");
            text.className = "mdui-col-xs-5 font1 title";
            text.innerText = rresult[i].title;
            var text1 = document.createElement("div");
            text1.className = "mdui-col-xs-3 time";
            text1.innerText = "上传时间：" + rresult[i].time;
            var text2 = document.createElement("div");
            text2.className = "mdui-col-xs-3 downloads";
            text2.innerText = "下载次数：" + rresult[i].downloads;
            var row2 = document.createElement("div");
            row2.className = "mdui-col-offset-xs-10";
            row2.style = "height:50px";
            row2.style = "line-height: 10px";
            row.appendChild(pic);
            row.appendChild(text);
            row.appendChild(text1);
            row.appendChild(text2);
            div.appendChild(row);
            div.appendChild(row2);
            td.appendChild(div);
            tr.appendChild(td);
            rtable.append(tr);
        }
        $('.index1').text(index1);
    }
    }})

    }


}.call(this));


function showa() {
    $("#tab1").show();//显示tab1
    $("#tab2").hide();
    $("#tab3").hide();
}
function showb() {
    $("#tab1").hide();
    $("#tab2").show();//显示tab2
    $("#tab3").hide();
    $("#tab3").myr;
}
function showc() {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").show();//显示tab3
}

// function del(i)
// {
//     var flag = confirm("确认删除?"+i);
//     if(flag) {
//         document.getElementById(i).remove();
//     }
// }





