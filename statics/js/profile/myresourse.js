(function () {
    //dom obj
    var rpre = $('#rpre');  // 上翻页
    var rnext = $('#rnext');//下翻页
    var rtable = $('#rtable');
    var index1 = 1; //当前位于第几页
    var num = 4; //一页最多显示多少个


    var rresult;
    var rlen ;
    var rlastIndex ;

    //请求后台返回结果 我的资源
    function renderr() {
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/profile/myResource",
            contentType: "application/json;charset=UTF-8",
            xhrFields: {
                withCredentials: true
            },
            dataType: "json", //预期服务器返回类
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    [...rresult] = data.data;//把json的data取出来
                    var index1 = 1; //当前位于第几页
                    var rlen = rresult.length;
                    var rlastIndex = Math.floor(rlen / num) + 1; //最多显示到第几页
                    listresource();
                }
            }
        })
    }

    //显示我的资源
    function listresource() {
        for (var i = (index1 - 1) * num; i < (index1 - 1) * num + num; i++) {
            if (i >= rlen)
                break;
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.className = "td mypreview";
            var div = document.createElement("div");
            div.style = "line-height: 60px";
            var row = document.createElement("div");
            row.style = "height:50px";
            var pic = document.createElement("img");
            pic.src = `../../statics/images/${rresult[i].type}.png`;
            pic.className = "mdui-col-xs-1 type";
            var text = document.createElement("div");
            text.className = "mdui-col-xs-5 font1 title";
            text.innerText = rresult[i].title;
            var text1 = document.createElement("div");
            text1.className = "mdui-col-xs-3 time";
            text1.innerText = "上传时间：" + rresult[i].time;
            var text2 = document.createElement("div");
            text2.className = "mdui-col-xs-3 downloads";
            text2.innerText = "下载次数：" + rresult[i].downloads;
            var row2 = document.createElement("div");
            row2.className = "mdui-col-offset-xs-10";
            row2.style = "height:50px";
            row2.style = "line-height: 10px";
            row.appendChild(pic);
            row.appendChild(text);
            row.appendChild(text1);
            row.appendChild(text2);
            div.appendChild(row);
            div.appendChild(row2);
            td.appendChild(div);
            tr.appendChild(td);
            rtable.append(tr);
        }
    }


    //初始化
    function initr() {
        rpre.css("visibility", "hidden");
        if (rlen <= num) {
            rnext.css("visibility", "hidden");
        }
        renderr();

    }
    initr();


    //下翻页
    function resnext() {
        rtable.empty()
        if (index1 == 1) {  //当前是第一页
            rpre.css("visibility", "visible");
        }
        if (index1 == (rlastIndex - 1)) //当前是倒数第二页
        {
            rnext.css("visibility", "hidden");
        }
        index1++;
        $('.index1').text(index1);
        listresource();

    }

    //上翻页
    function respre() {
        rtable.empty()
        if (index1 == rlastIndex) {  //当前是最后一页
            rnext.css("visibility", "visible");
        } if (index1 == 2) //当前是第二页
        {
            rpre.css("visibility", "hidden");
        }
        index1--;
        $('.index1').text(index1);
        listresource();
    }


    function showb() {
        $("#tab1").hide();
        $("#tab2").show();//显示tab2
        $("#tab3").hide();
    }

    $('#tabb').click(function () {
        showb();
        // renderr();
    })

    //上一页
    rpre.click(function () {
        respre();
    })
    //下一页
    rnext.click(function () {
        resnext();
    })


}.call(this));

