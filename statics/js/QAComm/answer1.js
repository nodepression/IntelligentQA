(function () {
    var len;   //答案个数
    var qId;   //问题id
    var question; //问题json
    var answers;  //回答json数组
    var myHtml;

    var types = ["学生", "教师", "管理员"];
    function generateHtml(item) {
        myHtml =
            `<div class="item ${item.id}">
                <div class="text">
                    ${item.details}
                </div>
                <div class="info">
                    <div class="like mdui-btn mdui-ripple">
                        <i class="mdui-icon material-icons mdui-icon-left">&#xe8dc;</i>
                        <span class="count">${item.count_like}</span>
                    </div>
                    <div class="mdui-btn setBest">设置为最佳答案</div>
                    <div class="user">${item.username}</div>
                    <div class="status">${types[item.usertype]}</div>
                    <div class="date">${ DataTrans(item.time)}</div>
                </div>
            </div>`
    }

    //渲染问题
    function renderQus() {
        $(".que>.title>.text").text(question.title);
        $(".que>.disc").text(question.description);
    }

    //渲染答案
    function renderAns() {
        for (var i = 0; i < len; i++) {
            generateHtml(answers[i]);
            $('.anslist').append(myHtml);
        }
        if (question.best_answer_id) { //有最佳答案   
            $('.setBest').text("");
        } else {
            $(".best").hide();
        }
        addEvent();
    }


    //渲染后台返回的结果按时间排序,每次请求必定刷新回答
    function getResult() {
        $('.anslist').empty()
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/QA/time",
            data: JSON.stringify({ "questionId": qId }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    question = data.data.question;
                    answers = data.data.answers;
                    len = answers.length;

                    // console.log(len);
                    renderQus();
                    renderAns();
                }

            }
        });
    }

    //回答问题
    function replyAns(text) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/replyques",
            data: JSON.stringify({ "questionId": qId, "answerDetails": text }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("答案提交成功！");
                    getResult();
                }
            }
        });
    }

    //点赞
    function like(ansId) {

        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/like",
            data: JSON.stringify({ "answerId": ansId }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("点赞成功");
                }
            }
        });
    }

    function chooseBest(queId,ansId) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/chooseBest",
            data: JSON.stringify({ "id": queId, "answerId": ansId }),
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
                    getResult();
                }
            }
        });
    }
    (function init() {
        //显示当前用户
        if (document.cookie != "") {
            var cookieUser = $.cookie("username").replace(/\"/g, "");;
            $("#userName").text(cookieUser);
        }
        qId = getUrlParam("index");
        //发送请求 渲染页面
        getResult();
    })();

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


    //事件绑定


    function addEvent() {
        //弹出回答问题框
        var inst = new mdui.Dialog('#reply_dialog', { 'overlay': true, 'destroyOnClosed': true });
        $(".replyBtn").click(function () {
            inst.open();
        })

        //发布回答

        $(".reply").click(function () {
            var text = $('.ansDialog').val();
            replyAns(text);
            inst.close();
        })
        //取消回答
        $(".cancel").click(function () {
            inst.close();
        })

        //点赞
        $('.like').click(function (e) {
            var ansId = $(e.target).parents(".item").attr("class").split(" ")[1];
            like(ansId);
            // alert(ansId);
            var myTarget = $(e.target).parents('.info').find('.count');
            var preCount = myTarget.text() * 1;
            myTarget.text(preCount + 1);
            myTarget.parents('.like').unbind();
            myTarget.parents('.like').attr("disabled", "disabled");
        })

        //选择最佳答案

        $('.setBest').click(function(e){
            var ansId = $(e.target).parents(".item").attr("class").split(" ")[1];
            chooseBest(qId,ansId);
        })

    }




}.call(this));