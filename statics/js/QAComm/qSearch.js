(function () {

    var words = $(".words").val();//用户输入的问题

    var index = 1; //当前位于第几页
    var num = 3;    //一页最多显示多少个
    var result = null;



    var myHtml;
    function generateHtml(item) {
        myHtml = `
            <div class="item ${item.question_id}">
                <div class="answer">
                    <div class="hint">有猿说:</div>
                    <div class="text">
                        <span class="ans_text">${showBest(item)}</span>
                        <span class="more">查看详情</span>
                    </div>
                </div>
                <div class="question">
                    <div class="hint">原问题:</div>
                    <div class="text">
                        <span class="state" style="display:${item.hasOwnProperty("answer_best") ? "inline-block" : "none"}">已解决</span>
                        <span class="que_text">${item.title}</span>
                    </div>
                </div>
            </div>`
    }


    function showBest(item) {
        if (item.hasOwnProperty("answer_best")) {
            return setString(item.answer_best, 100);
        } else if (item.hasOwnProperty("answers_other")) {
            return setString(item.answers_other[0], 100);
        }
        else {
            return "暂无回答";
        }
    }

    // 预览标题长度
    function setString(str, len) {
        if (str != "") {
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
                    return s + "......"
                }
            }
            return s
        }

    }

    function render() {
        for (var i = 0; i < num; i++) {
            if (i >= result.length)
                break;
            generateHtml(result[i]);
            $('.list').append(myHtml);
        }
        $('.index').text(index);
    }


    //点击搜索或者翻页的时候用
    function getResult(start, num) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/search",
            data:  JSON.stringify({ "q": words, "start": start, "rows": num }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                [...result] = data.data.response.docs;
                
                render();
            }
        });
    }

    (function init() {
        //显示当前用户
        if (document.cookie != "") {
            var cookieUser = $.cookie("username").replace(/\"/g, "");;
            $("#userName").text(cookieUser);
        }

        $('.list').empty();

        //当前是第一页，隐藏左翻页
        $('.pre').css("visibility", "hidden");
    })()


    //页码选择 

    //上一页 
    $('.pre').click(function () {
        $('.list').empty()

        index--;
        if (index == 1) {
            $('.pre').css("visibility", "hidden");
        }

        getResult(num * (index - 1), num);
        
    })

    //下一页
    $('.next').click(function () {
        $('.list').empty()

        if (index == 1) {
            $('.pre').css("visibility", "visible");
        }
        index++;
        getResult(num * (index - 1), num);
    })


    //获取搜索关键词
    var timer;
    $('.words').keyup(function () {

        if(timer){
            console.log("清除timer");
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            $('.list').empty();
            words = $('.words').val();
            if (words != " ") {
                index = 1;
                getResult(num * (index - 1), num);
            }
        },200);
    })

    //点击搜索

    $('#search').click(function (e) {
        $('.list').empty();

        if (words != "") {
            index = 1;
            getResult(num * (index - 1), num);
        } else {
            alert("请输入上传者或者关键词");
        }
    })

    //点击问题进入详情页
    $('.list').click(function(e){
        var qId;
        if($(e.target).hasClass("more")||$(e.target).hasClass("que_text")){
            qId = $(e.target).parents(".item").attr("class").split(" ")[1];
            window.location.href = '../QAComm/answer1.html?index=' + qId;
        }
    })


}.call(this));