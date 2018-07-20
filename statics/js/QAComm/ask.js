(function () {
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var tags = [];
    var tag0 = undefined;
    var tag1 = undefined;
    var tag2 = undefined;
    //dom obj
    var save = $('.save')//保存标签
    // var ok = $('#ok');//输入标签
    var selected = $('#selected');//标签选择框
    var ask = $('#ask'); //提问按钮，点击求猿

    // ok.click(function () {
    //     oktag();
    // })
    ask.click(function () {
        askquestions();
    })

    //保存标签
    save.on("click", function () {
        tag0 = $("#0").text();
        tag1 = $("#1").text();
        tag2 = $("#2").text();
        // alert(tag0); alert(tag1); alert(tag2);
        $('#demo')[0].selectedIndex = -1;

    })
    //提问
    function askquestions() {
        title = $("#title").val();//问题标题
        description = $("#description").val();//问题描述
        tags[0] = tag0;
        tags[1] = tag1;
        tags[2] = tag2;
        //alert(title + " " + description + " " + tags);
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



    //我要求猿
    var open = $('#open');//点击进入选择标签
    var inst = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
        inst.open();
    })

    // function oktag() {
    //     var inputField = undefined;
    //     inputField = $("#tags").val();
    //     var div = document.createElement("div");
    //     div.className = "mdui-chip";
    //     var span = document.createElement("span");
    //     span.className = "mdui-chip-title";
    //     span.innerText = inputField;
    //     var span1 = document.createElement("span");
    //     span1.className = "mdui-chip-delete";
    //     var i = document.createElement("i");
    //     i.className = "mdui-icon material-icons";
    //     i.innerText = "cancel";
    //     span1.appendChild(i);
    //     div.appendChild(span);
    //     div.appendChild(span1);
    //     selected.append(div);

    // }

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

//获得所有标签
function alltags(){
    $.ajax({
        type: 'post',
        url: "http://localhost:8080/QAComm/getTags",
        xhrFields: {
            withCredentials: true
        },
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
}


function find() {
    var inputField = undefined;
    inputField = $("#tags").val();
    var arr = new Array;
    // var Tags = [
    //     "调试", "智能合约", "cdn", "选择器", "抓包过滤", 
    //     "spring-mvc", "android相关问题", "cli", "静态网站", 
    // ];
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
    //$('#selected').empty();
    $('#selected').val("");
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
