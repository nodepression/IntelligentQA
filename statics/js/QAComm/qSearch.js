(function () {
    var index = 1; //当前位于第几页
    var num = 3; //一页最多显示多少个
    var result = new Array(16);
    var len = result.length;
    for (var k = 0; k < len; k++) {
        result[k] = {};
        result[k].title = "当说php是最好的语言的时候，理由在哪里";
        result[k].best = "就是在反讽。 PHP这么一个脚本语言，虽然他是web开发中，使用者最多的语言，最快最简单的语言， 生态环境和社区积累最深厚的语言，但都不能否定它的语法垃圾，高层设计不好";
        result[k].id = k * (k + 1);
    }
    var lastIndex = Math.floor(len / num) + 1; //最多显示到第几页

    var words = $(".words").val();


    var myHtml;
    function generateHtml(item) {
        myHtml =`
            <div class="item">
                <div class="answer">
                    <div class="hint">有猿说:</div>
                    <div class="text">
                        <span class="ans_text">${item.best}</span>
                        <span class="more">查看详情</span>
                    </div>
                </div>
                <div class="question">
                    <div class="hint">原问题:</div>
                    <div class="text">
                        <span class="state">已解决</span>
                        <span class="que_text">${item.title}</span>
                    </div>
                </div>
            </div>`
    }

    // function getResult()
    // {

    // }

    // 预览标题长度
    function setString(str, len) {
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2
            } else {
                strlen++
            }
            s += str.charAt(i);
            if (strlen >= len) {
                return s + "..."
            }
        }
        return s
    }

    function render() {
        for (var i = (index - 1) * num; i < (index - 1) * num + num; i++) {
            if (i >= len)
                break;
            generateHtml(result[i]);
            $('.list').append(myHtml);
        }
        $('.index').text(index);
    }

    function getResult() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/resource/search",
            data: JSON.stringify({ "words": words }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...result] = data.data;
                    init();
                }
            }
        });
    }

    function init() {
        $('.pre').css("visibility", "hidden");
        if (len <= num) {
            $('.next').css("visibility", "hidden");
        }
        render();
    }
    init();


    //页码选择 

    //上一页
    $('.pre').click(function () {
        $('.list').empty()
        if (index == lastIndex) {  //当前是最后一页
            $('.next').css("visibility", "visible");
        }
        if (index == 2) //当前是第二页
        {
            $('.pre').css("visibility", "hidden");
        }
        index--;
        render();
    })

    //下一页
    $('.next').click(function () {
        $('.list').empty()
        if (index == 1) {  //当前是第一页
            $('.pre').css("visibility", "visible");
        }
        if (index == (lastIndex - 1)) //当前是倒数第二页
        {
            $('.next').css("visibility", "hidden");
        }
        index++;
        render();
    })


    //获取搜索关键词
    $('.words').change(function (e) {
        words = $('.words').val();
    })

    //点击搜索

    $('#search').click(function (e) {
        if (words != "") {
            getResult();
        } else {
            alert("请输入上传者或者关键词");
        }
    })

}.call(this));