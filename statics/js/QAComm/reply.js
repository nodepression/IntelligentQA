(function () {
    // 前后端传输数据
    var qid = undefined;
    //dom obj
    var filter = $('#filter');//点击传标签获得相应问题
    var apre = $('#apre');  // 上翻页
    var anext = $('#anext');//下翻页
    var atable = $('#questions');
    var aindex = 1; //当前位于第几页
    var anum = 6; //一页最多显示多少个
    var aresult = new Array(12);
    var alen = aresult.length;
    var alastIndex = Math.floor(alen / anum) + 1; //最多显示到第几页

    $(".topBar .answerNav").click(function (){  
        renderall();
        atable.val("");//清空问题列表
        alltags();
    })

    //上一页
    apre.click(function () {
        anspre();
    })
    //下一页
    anext.click(function () {
        ansnext();
    })
    filter.click(function () {
        rendera();
    })

  
    //伸出猿手
    function ansnext() {
        atable.empty()
        if (aindex == 1) {  //当前是第一页
            apre.css("visibility", "visible");
        }
        if (aindex == (alastIndex - 1)) //当前是倒数第二页
        {
            anext.css("visibility", "hidden");
        }
         aindex++;
         $('.aindex').text(aindex);
        // rendera();

    }

    function anspre() {
        atable.empty()
        if (aindex == alastIndex) {  //当前是最后一页
            anext.css("visibility", "visible");
        } if (aindex == 2) //当前是第二页
        {
            apre.css("visibility", "hidden");
        }
         aindex--;
         $('.aindex').text(aindex);
        // rendera();

    }


    //初始化
    function inita() {
        apre.css("visibility", "hidden");
        if (alen <= anum) {
            anext.css("visibility", "hidden");
        }
        // rendera();

    }
    inita();


    //根据输入的标签筛选问题
    function rendera() {
        ftag = $("#ftag").val();//输入的标签

        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/reply",
            data: JSON.stringify({ "questionLabel1": ftag }),
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...aresult] = data.data;//把json的data取出来
                    // if (alen <= anum) {
                    //     $('.page i').css("display", "none");
                    // }
                    for (var i = (aindex - 1) * anum; i < (aindex - 1) * anum + anum; i++) {
                        if (i >= alen)
                            break;

                        var li = document.createElement("li");
                        li.className = "mdui-list-item li";
                        li.id = aresult[i].id;
                        var div = document.createElement("div");
                        div.className = "mdui-list-item-content";
                        var div1 = document.createElement("div");
                        div1.className = "mdui-list-item-title font1 mdui-col-xs-5";
                        div1.innerText = aresult[i].title;
                        var span = document.createElement("span");
                        span.style = "color: gray";
                        span.className = "mdui-col-xs-3 "
                        var icon = document.createElement("i")
                        icon.className = "mdui-icon material-icons";
                        icon.innerText = "local_offer";
                        var span3 = document.createElement("span");

                        span3.innerText =  aresult[i].tags[0];
                        var span1 = document.createElement("span");
                        span1.innerText = aresult[i].count+"回答";
                        span1.className = "mdui-col-xs-1 "
                        var span2 = document.createElement("span");
                        span2.innerText = aresult[i].time;
                        var li1 = document.createElement("li");
                        li1.className = "mdui-divider-inset mdui-m-y-0";
                        span.appendChild(icon);
                        span.appendChild(span3);
                        div1.appendChild(span);
                        div.appendChild(div1);
                        li.appendChild(div);
                        li.appendChild(span1);
                        li.appendChild(span2);
                        atable.append(li);
                        atable.append(li1);
                    }
                }
            }
        })


    }

    function renderall() {
        ftag = $("#ftag").val();//输入的标签

        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/showques",
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...aresult] = data.data;//把json的data取出来
                    // if (alen <= anum) {
                    //     $('.page i').css("display", "none");
                    // }
                    for (var i = (aindex - 1) * anum; i < (aindex - 1) * anum + anum; i++) {
                        if (i >= alen)
                            break;

                        var li = document.createElement("li");
                        li.className = "mdui-list-item li";
                        li.id = aresult[i].id;
                        var div = document.createElement("div");
                        div.className = "mdui-list-item-content";
                        var div1 = document.createElement("div");
                        div1.className = "mdui-list-item-title font1";
                        div1.innerText = aresult[i].title;
                        var span = document.createElement("span");
                        span.style = "color: gray;left: 10px";
                        var icon = document.createElement("i")
                        icon.className = "mdui-icon material-icons";
                        icon.innerText = "local_offer";
                        var span3 = document.createElement("span");

                        span3.innerText =  aresult[i].tags[0];
                        var span1 = document.createElement("span");
                        span1.style = "margin-left:330px";
                        span1.innerText = aresult[i].count;
                        var span2 = document.createElement("span");
                        span2.style = "margin-left:30px";
                        span2.innerText = aresult[i].time;
                        var li1 = document.createElement("li");
                        li1.className = "mdui-divider-inset mdui-m-y-0";
                        span.appendChild(icon);
                        span.appendChild(span3);
                        div1.appendChild(span);
                        div.appendChild(div1);
                        li.appendChild(div);
                        li.appendChild(span1);
                        li.appendChild(span2);
                        atable.append(li);
                        atable.append(li1);
                    }
                }
            }
        })


    }



//点击问题跳转
$('#questions').click(function (e) {
    var tagItem;
    if ($(e.target).hasClass("li")) {
        tagItem = $(e.target);
    } else {
        tagItem = $(e.target).parents(".li");
    }
    //  //获取问题id
    qid = tagItem.attr("id");
    window.location.href = '../QAComm/answer.html?index=' + qid;
})



}.call(this));


