(function () {
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var tags = [];
    var tag0 = undefined;
    var tag1 = undefined;
    var tag2 = undefined;
    var question = undefined;
    var qid = undefined;
    //dom obj
    var save = $('.save')//保存标签
    var ok = $('#ok');//输入标签
    var selected = $('#selected');//标签选择框
    var search = $('#search');//智能搜索
    var ask = $('#ask'); //提问按钮，点击求猿
    var filter = $('#filter');//点击传标签获得相应问题
    var apre = $('#apre');  // 上翻页
    var anext = $('#anext');//下翻页
    var atable = $('#questions');
    var aindex = 1; //当前位于第几页
    var anum = 6; //一页最多显示多少个
    var aresult = new Array(12);
    var alen = aresult.length;
    var alastIndex = Math.floor(alen / anum) + 1; //最多显示到第几页

    //保存标签
    save.on("click", function () {
        tag0 = $("#0").text();
        tag1 = $("#1").text();
        tag2 = $("#2").text();
        alert(tag0); alert(tag1); alert(tag2);
        $('#demo')[0].selectedIndex = -1;

    })
    //提问
    function askquestions() {
        title = $("#title").val();//问题标题
        description = $("#description").val();//问题描述
        tags[0] = tag0;
        tags[1] = tag1;
        tags[2] = tag2;
        alert(title + " " + description + " " + tags);
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/quiz",
            data: JSON.stringify({ "questionTitle": title, "questionDescription": description, "tags": tags }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("提问成功");
                }
            }
        });
    }

    ok.click(function () {
        oktag();
    })
    search.click(function () {
        searchq();
    })
    //上一页
    apre.click(function () {
        anspre();
    })
    //下一页
    anext.click(function () {
        ansnext();
    })
    ask.click(function () {
        askquestions();
    })
    filter.click(function () {
        rendera();
    })

    //智能搜索
    function searchq() {
        question = $("#question").val();   //问题
        alert(question);
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/search",
            data: JSON.stringify({ "question": question }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    //??
                }
            }
        })
    }

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
        rendera();

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
        rendera();

    }


    //初始化
    function inita() {
        apre.css("visibility", "hidden");
        if (alen <= anum) {
            anext.css("visibility", "hidden");
        }
        rendera();

    }
    inita();


    //渲染后台返回的结果
    function rendera() {
        ftag = $("#ftag").val();//输入的标签
        if (ftag = "") {
            $.ajax({
                type: 'post',
                url: "http://localhost:8080/QAComm/showques",
                data: JSON.stringify({}),
                contentType: "application/json;charset=UTF-8",
                dataType: "json", //预期服务器返回类
                success: function (data) {
                    if (data.status != 200) {
                        alert(data.msg);
                    } else {
                        [...aresult] = data.data;//把json的data取出来
                        if (alen <= anum) {
                            $('.page i').css("display", "none");
                        }
                        for (var i = (aindex - 1) * anum; i < (aindex - 1) * anum + anum; i++) {
                            if (i >= alen)
                                break;
                            var li = document.createElement("li");
                            li.className = "mdui-list-item";
                            li.id = aresult[i].id;
                            var div = document.createElement("div");
                            div.className = "mdui-list-item-content";
                            var div1 = document.createElement("div");
                            div1.className = "mdui-list-item-title font1";
                            div1.innerText = aresult[i].title;
                            var span = document.createElement("span");
                            span.style = "color: gray;left: 10px";
                            var i = document.createElement("i")
                            i.className = "mdui-icon material-icons";
                            i.innerText = "local_offer";
                            var span3 = document.createElement("span");
                            span3.innerText = aresult[i].tags;
                            var span1 = document.createElement("span");
                            span1.style = "margin-left:330px";
                            span1.innerText = aresult[i].count;
                            var span2 = document.createElement("span");
                            span2.style = "margin-left:30px";
                            span2.innerText = aresult[i].time;
                            var li1 = document.createElement("li");
                            li1.className = "mdui-divider-inset mdui-m-y-0";
                            span.appendChild(i);
                            span.appendChild(span3);
                            div1.appendChild(span);
                            div.appendChild(div1);
                            li.appendChild(div);
                            li.appendChild(span1);
                            li.appendChild(span2);
                            atable.append(li);
                            atable.append(li1);
                        }
                        $('.aindex').text(aindex);
                    }
                }
            })
        }
        else {
            $.ajax({
                type: 'post',
                url: "http://localhost:8080/QAComm/showques",
                data: JSON.stringify({ "tag": ftag }),
                contentType: "application/json;charset=UTF-8",
                dataType: "json", //预期服务器返回类
                success: function (data) {
                    if (data.status != 200) {
                        alert(data.msg);
                    } else {
                        [...aresult] = data.data;//把json的data取出来
                        if (alen <= anum) {
                            $('.page i').css("display", "none");
                        }
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
                            var i = document.createElement("i")
                            i.className = "mdui-icon material-icons";
                            i.innerText = "local_offer";
                            var span3 = document.createElement("span");
                            span3.innerText = aresult[i].tags;
                            var span1 = document.createElement("span");
                            span1.style = "margin-left:330px";
                            span1.innerText = aresult[i].count;
                            var span2 = document.createElement("span");
                            span2.style = "margin-left:30px";
                            span2.innerText = aresult[i].time;
                            var li1 = document.createElement("li");
                            li1.className = "mdui-divider-inset mdui-m-y-0";
                            span.appendChild(i);
                            span.appendChild(span3);
                            div1.appendChild(span);
                            div.appendChild(div1);
                            li.appendChild(div);
                            li.appendChild(span1);
                            li.appendChild(span2);
                            atable.append(li);
                            atable.append(li1);
                        }
                        $('.aindex').text(aindex);
                    }
                }
            })
        }

    }



    //我要求猿
    var open = $('#open');//点击进入选择标签
    var inst = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
        inst.open();
    })






    function oktag() {
        var inputField = undefined;
        inputField = $("#tags").val();
        var div = document.createElement("div");
        div.className = "mdui-chip";
        var span = document.createElement("span");
        span.className = "mdui-chip-title";
        span.innerText = inputField;
        var span1 = document.createElement("span");
        span1.className = "mdui-chip-delete";
        var i = document.createElement("i");
        i.className = "mdui-icon material-icons";
        i.innerText = "cancel";
        span1.appendChild(i);
        div.appendChild(span);
        div.appendChild(span1);
        selected.append(div);

    }

    $('#demo')[0].selectedIndex = -1;
    $("#demo").change(function () {
        var options = $("#demo option:selected");  //获取选中的项
        //alert(options.val());   //拿到选中项的值 
        if (options.val() && ($(".mdui-chip").length < 3)) {
            var div = document.createElement("div");
            div.className = "mdui-chip";
            var span = document.createElement("span");
            span.className = "mdui-chip-title";
            span.id = $(".mdui-chip-title").length;
            span.innerText = options.val();
            var span1 = document.createElement("span");
            span1.className = "mdui-chip-delete";
            var i = document.createElement("i");
            i.className = "mdui-icon material-icons del";
            i.style = "position: relative;left:-6px;"
            i.innerText = "cancel";
            span1.appendChild(i);
            div.appendChild(span);
            div.appendChild(span1);
            selected.append(div);
            $("#selected").click(function (e) {
                var tagItem;
                if ($(e.target).hasClass("mdui-chip")) {
                    tagItem = $(e.target);
                } else {
                    tagItem = $(e.target).parents(".mdui-chip");
                }
                tagItem.remove();
            })
        }


        $('#tags').val("");
    });

}.call(this));





var a = $('#append');//自动匹配
//自动匹配
function find() {
    var inputField = undefined;
    inputField = $("#tags").val();
    var arr = new Array;
    $.ajax({
        type: 'post',
        url: "http://localhost:8080/QAComm/getTags",
        data: JSON.stringify({}),
        contentType: "application/json;charset=UTF-8",
        dataType: "json", //预期服务器返回类
        success: function (data) {
            if (data.status != 200) {
                alert(data.msg);
            } else {
                [...Tags] = data.data;//把json的data取出来}}
            }
        }
    })

    var Tags = [
        "调试", "智能合约", "cdn", "选择器", "抓包过滤", "a", "fis3打包", "ssh-key", "cgo", "比特币", "powerbi", "sharding",
        "spring-mvc", "android相关问题", "cli", "静态网站", "cmd", "ping", "cms", "pip3", "异步编程", "代理", "注册", "cpu",
        "mapper", "伪元素", "模块化开发", "反射", "sketch", "css", "csv", "for循环", "element", "ansible", "celery", "kubernetes",
        "作用域链", "memory", "实体类", "下载", "srping", "dotnet", "tensorflow", "fluentd", "fetch", "分库分表", "redis-cluster",
        "dba", "异步请求", "摄像头", "适配器", "js-xlsx", "mycat", "spark-submit", "qrcode", "小白求助", "dma", "u盘", "自动化",
        "反编译", "dom", "虚函数表", "emoji", "networking", "nginx", "ip伪造", "根目录", "网页设计", "dtd", "删除文件", "泛型",
        "软件开发", "索引", "fixed导航栏", "银行卡", "js异步编程", "游戏开发", "wordpress", "navigator", "逻辑", "line-height",
        "语音合成", "apple", "跨域", "bash", "分页", "内存溢出", "全文检索", "eslint", "ec2", "facebook", "html", "stylesheets",
        "devtool", "jackson", "async", "kibana", "next.js", "cocos", "框架", "BI", "ejs", "elk", "http", "http首部", "codeigniter",
        "管道", "tcp抓包", "超时", "蓝牙", "symfony3", "es5", "es7", "es6", "循环", "echarts", "phabricator", "etl", "验证码",
        "印象笔记", "mongodb",
    ];
    var len = Tags.length;
    var j = 0;
    for (var i = 0; i < len; i++) {
        if ((Tags[i]).indexOf(inputField) >= 0) {
            arr[j] = Tags[i];
            j++;
        }
    }
    set(arr);
}

var inst = $('#demo');//自动匹配
//将符合的建议项逐条放置于弹出框中
function set(arr) {
    var size = arr.length;
    var nextNode = undefined;
    if (size > 0) { inst.css("display", "block"); }
    else if (size == 0 || $('#tags').val == "") { inst.css("display", "none"); }
    $('#demo').empty();
    $('#demo').append('<option>' + '--请选择--' + '</option>');
    for (var i = 0; i < size; i++) {
        var nextNode = arr[i];
        //alert(nextNode+i);
        $('#demo').append('<option>' + nextNode + '</option>');
        mdui.mutation();
    }
}

var cancell = $('#cancell');//取消 清空
cancell.click(function () {
    clear();
})
function clear() {
    inst.css("display", "none");
    $('#tags').val("");
    $('#selected').empty();
}


//提取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
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
