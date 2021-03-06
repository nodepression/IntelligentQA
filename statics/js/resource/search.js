(function () {
    var index = 1; //当前位于第几页
    var num = 5; //一页最多显示多少个
    var result;
    var len;
    var lastIndex; //最多显示到第几页
    var words = $(".words").val();


    function render() {
        for (var i = (index - 1) * num; i < (index - 1) * num + num; i++) {
            if (i >= len)
                break;
            var item = document.createElement("div");
            item.className = "item preview "+ result[i].fileid;


            var titleCon = document.createElement("span");
            titleCon.className = "titleCon";
            var title = document.createElement("span");
            title.className = "title";
            title.innerText = result[i].title;
            var type = document.createElement("span");
            type.className = "type";
            type.innerText = result[i].type;
            titleCon.appendChild(title);
            titleCon.appendChild(type);
            item.appendChild(titleCon);


            var uploaderCon = document.createElement("span");
            uploaderCon.className = "uploaderCon";
            uploaderCon.innerText = "上传者 : ";
            var uploader = document.createElement("span");
            uploader.className = "uploader";
            uploader.innerText = result[i].uploader;
            uploaderCon.appendChild(uploader)
            item.appendChild(uploaderCon);


            var downloadsCon = document.createElement("span");
            downloadsCon.className = "dowloadsCon";
            downloadsCon.innerText = "下载量 : ";
            var downloads = document.createElement("span");
            downloads.className = "downloads";
            downloads.innerText = result[i].downloads;
            downloadsCon.appendChild(downloads)
            item.appendChild(downloadsCon);


            $('.list').append(item);
        }
        $('.index').text(index);
    }

    function getResult() {
        $('.list').empty()
        $.ajax({
            type: 'post',
            url:  prefix + "/resource/search",
            data: JSON.stringify({ "words": words }),
            contentType: "application/json;charset=UTF-8",
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...result] = data.data;
                    index = 1
                    len = result.length;
                    if(len % num == 0)
                    {
                        lastIndex = len / num;
                    }else{
                        lastIndex = Math.floor(len / num) + 1;
                    }
                    
                   

                    $('.pre').css("visibility", "hidden");
                    $('.next').css("visibility", "visible");
                    
                    if (len <= num) {
                        $('.next').css("visibility", "hidden");
                    }
                    
                    render();
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
    })();


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