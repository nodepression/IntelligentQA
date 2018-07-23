//我要求猿界面
(function () {
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var Tags;//后台返回的所有标签
    var tags = [];//给所提问题选择添加的标签
    var tag0 = undefined;
    var tag1 = undefined;
    var tag2 = undefined;
    //dom obj
    var inst = $('#demo');//自动匹配
    // var a = $('#append');//自动匹配
    var save = $('.save')//保存标签
    var cancell = $('#cancell');//取消 清空
    var selected = $('#selected');//标签选择框
    var ask = $('#ask'); //提问按钮，点击求猿
    var open = $('#open');//点击进入选择标签


    //获得所有标签
    function alltags() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/getTags",
            xhrFields: {
                withCredentials: true
            },
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
    }

    //初始化
    function init() {
        //显示当前用户
        if (document.cookie != "") {
            var cookieUser = $.cookie("username").replace(/\"/g, "");;
            $("#userName").text(cookieUser);
        }
        alltags();
    };
    init();


    //提问
    function askquestions() {
        title = $("#title").val();//问题标题
        description = $("#description").val();//问题描述
        tags[0] = tag0;
        tags[1] = tag1;
        tags[2] = tag2;
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/quiz",
            data: JSON.stringify({ "questionTitle": title, "questionDescription": description, "tags": tags }),
            xhrFields: {
                withCredentials: true
            },
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


    //自动匹配
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
            $('#demo').append('<option>' + nextNode + '</option>');
            mdui.mutation();
        }
    }

    function find() {
        var inputField = undefined;
        inputField = $("#tags").val();
        var arr = new Array;
        var len = Tags.length;
        var j = 0;
        for (var i = 1; i < len; i++) {
            if ((Tags[i]).indexOf(inputField) >= 0) {
                arr[j] = Tags[i];
                j++;
            }
        }
        set(arr);
    }




    //清空选择框
    function clear() {
        inst.css("display", "none");
        $('#tags').val("");
        $('#selected').val("");
    }


    cancell.click(function () {
        clear();
    })



    //我要求猿

    var tag_dialog = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
        tag_dialog.open();
    })

    // //点击问题跳转
    // $('#questions').click(function (e) {
    //     var tagItem;
    //     if ($(e.target).hasClass("li")) {
    //         tagItem = $(e.target);
    //     } else {
    //         tagItem = $(e.target).parents(".li");
    //     }
    //     //  //获取问题id
    //     qid = tagItem.attr("id");
    //     window.location.href = '../QAComm/answer1.html?index=' + qid;
    // })



    ask.click(function () {
        askquestions();
    })

    //根据输入匹配标签
    $("#tags").keyup(function () {
        find();
    })


    //保存标签
    save.on("click", function () {
        tag0 = $("#0").text();
        tag1 = $("#1").text();
        tag2 = $("#2").text();
        $('#demo')[0].selectedIndex = -1;
    })


}.call(this));


