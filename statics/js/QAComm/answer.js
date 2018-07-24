//点进问题的问题详情界面
(function () {
    var best = $('.best');//设置最佳回答
    var closeq = $('#closeq');//关闭问题
    var like = $('.like');//点赞回答

    var id = undefined;// 问题id
    var qid = undefined;// 提出问题者的id
    var sid = undefined;// 登陆者的id
    var result = null;

   
    //时间戳转换
    function DataTrans(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    }


    //提取url参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    id = getUrlParam("index");


    (function init() {
        //显示当前用户
        if (document.cookie != "") {
            var cookieUser = $.cookie("username").replace(/\"/g, "");;
            $("#userName").text(cookieUser);
        }
        rendera();
    })();


    //渲染后台返回的结果  回答按时间排序
    function rendera() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/QA/time",
            data: JSON.stringify({ "questionId": id }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    result = data.data;//把json的data取出来
                    $('#qtitle').append(result.question.title);
                    $('#qdesc').append(result.question.description);
                    $('#qtime').append(DataTrans(result.question.time));
                    var len;
                    if (result.answers != "") {
                        len = result.answers.length;
                    }
                    for (var k = 0; k < len; k++) {
                        //alert(len);
                        var all = document.createElement("div");
                        all.className = "mdui-rowa";
                        var all1 = document.createElement("i");
                        all1.className = "mdui-icon material-icons";
                        all1.style = "color:  rgb(1,102,144)";
                        all1.innerText = "flag";
                        var all2 = document.createElement("span");
                        all2.style = "color: #016690";
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
                        button.className = "mdui-btn-group button like";
                        button.style = "color: rgb(1,102,144);font-size: 15px;border-radius: 5px";
                        var i = document.createElement("i");
                        i.className = "mdui-icon material-icons";
                        i.innerText = "thumb_up";
                        var span = document.createElement("span");
                        span.innerText = result.answers[k].count_like;//点赞数count
                        span.id="up";
                        button.id = "answerID";
                        button.appendChild(i);
                        button.appendChild(span);
                        div1.appendChild(button);
                        var span1 = document.createElement("span");
                        span1.innerText = result.answers[k].username;//回答者名name
                        span1.style = "margin-left:380px;";
                        var span2 = document.createElement("span");
                        span2.className = "mdui-col-offset-md-1"
                        var button2 = document.createElement("button");
                        button2.className = "mdui-btn-group button";
                        if(result.answers[k].usertype==0)
                        button2.innerText ="学生";//回答者身份
                        if(result.answers[k].usertype==1)
                        button2.innerText ="老师";//回答者身份
                        button2.style = "border-color: rgb(43,51,59);color: rgb(43,51,59);font-size: 15px;border-radius: 5px;left:15px;";
                        var span3 = document.createElement("span");
                        span3.className = "mdui-col-offset-md-1";
                        span3.innerText = DataTrans(result.answers[k].time);//回答时间time
                        span2.appendChild(button2);
                        div1.appendChild(span1);
                        div1.appendChild(span2);
                        div1.appendChild(span3);
                        var div2 = document.createElement("div");
                        div2.className = "mdui-rowc";
                        var div3 = document.createElement("div");
                        div3.className = "mdui-divider-dark";
                        var button1 = document.createElement("button");
                        button1.className = "mdui-btn-dense mdui-btn best";
                        button1.style = "position: relative;left:600px;top:-180px;color:#016690;"
                        button1.id = "answerID";
                        button1.innerText = "设置为最佳答案";


                        if (document.cookie != "") {
                            sid = $.cookie("id").replace(/\"/g, "");
                            type = $.cookie("type").replace(/\"/g, "");
                        }

                        if (qid != sid) button1.style = "display:none";
                        div2.appendChild(div3);
                        // bestanswer = result.question.best_answer_id;
                        // if (bestanswer !== "null" && ii == 0) { anstop.append(all); ii++; }//如果有最佳答案
                        // if (bestanswer ==="null") { anstop.append(button1); }//如果没有最佳答案
                        anstop.append(d);
                        anstop.append(div);
                        anstop.append(div1);
                        anstop.append(div2);
                    }

                }
            }
        })
    }


    //设置最佳答案
    best.click(function () {
        var Id = $(e.target).id;
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/chooseBest",
            data: JSON.stringify({ "id": id, "answerId": Id }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("最佳答案设置成功！");
                    button1.style = "display:none;";
                }
            }
        });
    })

    //关闭问题
    closeq.click(function () {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/closeQuestion",
            data: JSON.stringify({ "questionId": id, }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("问题已关闭!");
                    $('.closeQue').attr("disabled","disabled");
                    $('.closeQue').text("已关闭");
                }
            }
        });
    })


    //点赞
    like.click(function (e) {
        var Id = $(e.target).id;
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
                   
                    $('.up').text( result.answers[k].count_like++);
                    like.disabled = 'disabled';
                }
            }
        });
    })

}.call(this));



