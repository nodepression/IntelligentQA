(function () {
    //dom obj
    var qpre = $('#qpre');  // 上翻页
    var qnext = $('#qnext');//下翻页
    var qtable = $('#qtable');
    var index = 1; //当前位于第几页
    var num = 4; //一页最多显示多少个
    var qresult = new Array(10);
    var len = qresult.length;
    var lastIndex = Math.floor(len / num) + 1; //最多显示到第几页
    for (var k = 0; k < len; k++) {
        qresult[k] = k;
    }

    function DataTrans(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    }

    //上一页
    qpre.click(function () {
        quespre();
    })
    //下一页
    qnext.click(function () {
        quesnext();
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
        $('.index').text(index);
        // renderq();

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
        $('.index').text(index);
        //renderq();

    }

    //初始化
    function initq() {
        qpre.css("visibility", "hidden");
        if (len <= num) {
            qnext.css("visibility", "hidden");
        }
        // renderq();

    }
    initq();


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
                    [...qresult] = data.data;//把json的data取出来
                    index=1;
                    // if (qlen <= num) {
                    //     $('.page i').css("display", "none");
                    // }
                    for (var i = (index - 1) * num; i < (index - 1) * num + num; i++) {
                        if (i >= len)
                            break;
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.className = "td";
                        td.id = qresult[i].id;//qresult[i].id
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
                        text2.innerText = "发布时间：" + DataTrans(qresult[i].time);//qresult[i].time;
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
                }
            }
        })
    }

    //点击问题跳转
    $('#qtable').click(function (e) {
        qid = this.id;
        var tagItem;
        if ($(e.target).hasClass("td")) {
            tagItem = $(e.target);
        } else {
            tagItem = $(e.target).parents(".td");
        }
        //  //获取问题id
        qid = tagItem.attr("id");
        window.location.href = '../QAComm/answer.html?index=' + qid;
    })


   
    function showc() {
        $("#tab1").hide();
        $("#tab2").hide();
        $("#tab3").show();//显示tab3
        
    }

    $('#tabc').click(function () {
        showc();
        renderq();
    })
}.call(this));

