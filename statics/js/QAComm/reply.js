//伸出猿手界面
(function () {
    // 前后端传输数据
    var qid = undefined;
    //dom obj
    var filter = $('#filter');//点击传标签获得相应问题
    var apre = $('#apre');  // 上翻页
    var anext = $('#anext');//下翻页
    var bpre = $('#bpre');  // 上翻页
    var bnext = $('#bnext');//下翻页
    var cpre = $('#cpre');  // 上翻页
    var cnext = $('#cnext');//下翻页
    var atable = $('#questions');
    var aindex = 1; //当前位于第几页
    var anum = 6; //一页最多显示多少个
    var alen;
    var alastIndex; //最多显示到第几页
    var ftag = "";


    //显示问题
    function listq() {
        for (var i = 0; i < anum; i++) {
            if (i >= alen)
                break;
            var li = document.createElement("li");
            li.className = "li";
            li.id = aresult[i].id;
            var div = document.createElement("div");
            div.className = "ques";
            var div1 = document.createElement("div");
            div1.className = "font1 ";
            div1.innerText = setString(aresult[i].title,60);
            var span = document.createElement("span");
            span.style = "color: gray";
            var icon = document.createElement("i")
            icon.className = "mdui-icon material-icons";
            icon.innerText = "local_offer";
            var span3 = document.createElement("span");
            span3.className="jumpto";
            if(ftag!="") {span3.innerText = ftag;}
            else if(ftag=="") {span3.innerText = aresult[i].tags[0];}
            span3.id=$(span3).text();
            var span4 = document.createElement("span");
            span4.className="jumpto";
            if((aresult[i].tags[1]!=ftag)&&(aresult[i].tags[1]!=undefined)) 
            {span4.innerText = ","+aresult[i].tags[1];}
            span4.id=($(span4).text().substr(1));
            var span5 = document.createElement("span");
            span5.className="jumpto";
            if((aresult[i].tags[2]!=ftag)&&(aresult[i].tags[2]!=undefined)) 
            {span5.innerText = ","+aresult[i].tags[2];}
            span5.id=($(span5).text().substr(1));
            var span1 = document.createElement("span");
            span1.className = "ansCount";
            span1.innerText = aresult[i].count + " 回答";
            var span2 = document.createElement("span");
            span2.className = "ansDate";
            span2.innerText = aresult[i].time;
            var li1 = document.createElement("li");
            li1.className = "mdui-divider-inset mdui-m-y-0";
            if(aresult[i].tags!=""){ span.appendChild(icon);
            span.appendChild(span3);
            span.appendChild(span4);
            span.appendChild(span5);}
            div1.appendChild(span);
            div.appendChild(div1);
            li.appendChild(div);
            li.appendChild(span1);
            li.appendChild(span2);
            atable.append(li);
            atable.append(li1);
        }
    }


    //长度截取
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
                    return s + "..."
                }
            }
            return s
        }

    }




    //第一次初始化
    function inita() {
        apre.css("visibility", "hidden");
        if (alen <= anum) {
            anext.css("visibility", "hidden");
        }
        renderall(anum * (aindex - 1), anum);
    }
    inita();

     //初始化
     function initato() {
         atable.empty();
         aindex=1;
         $('.aindex').text(aindex);
         $('.apage').hide();
         $('.bpage').show();
         $('.cpage').hide();
        bpre.css("visibility", "hidden");
        if (alen <= anum) {
            bnext.css("visibility", "hidden");
        }
        rendera(anum * (aindex - 1), anum);
    }

    //点标签初始化
    function initaclick() {
        atable.empty();
        aindex=1;
        $('.aindex').text(aindex);
        $('.apage').hide();
        $('.bpage').hide();
        $('.cpage').show();
       cpre.css("visibility", "hidden");
       if (alen <= anum) {
           cnext.css("visibility", "hidden");
       }
       renderclick(anum * (aindex - 1), anum);
   }

    //下翻页
    function ansnext() {
        atable.empty();
        if (aindex == 1) {  //当前是第一页
            apre.css("visibility", "visible");
        }
        aindex++;
        $('.aindex').text(aindex);
        renderall(anum * (aindex - 1), anum);
    }

    //上翻页
    function anspre() {
        atable.empty();
        if (aindex == alastIndex) {  //当前是最后一页
            anext.css("visibility", "visible");
        } if (aindex == 2) //当前是第二页
        {
            apre.css("visibility", "hidden");
        }
        aindex--;
        $('.aindex').text(aindex);
        renderall(anum * (aindex - 1), anum);
    }

//下翻页
function bansnext() {
    atable.empty();
    if (aindex == 1) {  //当前是第一页
        bpre.css("visibility", "visible");
    }
    if (aindex == (alastIndex - 1)) //当前是倒数第二页
    {
        anext.css("visibility", "hidden");
    }
    aindex++;
    $('.aindex').text(aindex);
    rendera(anum * (aindex - 1), anum);
}

//上翻页
function banspre() {
    atable.empty();
    if (aindex == alastIndex) {  //当前是最后一页
        bnext.css("visibility", "visible");
    } if (aindex == 2) //当前是第二页
    {
        bpre.css("visibility", "hidden");
    }
    aindex--;
    $('.aindex').text(aindex);
    rendera(anum * (aindex - 1), anum);
}

//下翻页
function cansnext() {
    atable.empty();
    if (aindex == 1) {  //当前是第一页
        cpre.css("visibility", "visible");
    }
    if (aindex == (alastIndex - 1)) //当前是倒数第二页
    {
        cnext.css("visibility", "hidden");
    }
    aindex++;
    $('.aindex').text(aindex);
    renderclick(anum * (aindex - 1), anum);
}

//上翻页
function canspre() {
    atable.empty();
    if (aindex == alastIndex) {  //当前是最后一页
        cnext.css("visibility", "visible");
    } if (aindex == 2) //当前是第二页
    {
        cpre.css("visibility", "hidden");
    }
    aindex--;
    $('.aindex').text(aindex);
    renderclick(anum * (aindex - 1), anum);
}

        //一点进伸出援手 出现的问题列表
        function renderall(start, anum) {
            $.ajax({
                type: 'post',
                url: prefix + "/QAComm/showques",
                data:  JSON.stringify({ "start": start, "rows": anum }),
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
                        listq();
                    }
                }
            })
        }


    //根据输入的标签筛选问题
    function rendera(start, anum) {
        ftag = $("#ftag").val();//输入的标签
        $.ajax({
            type: 'post',
            url: prefix + "/QAComm/reply",
            data: JSON.stringify({ "questionLabel1": ftag, "start": start, "rows": anum }),
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
                    listq();
                }
            }
        })
    }

    //根据点击的标签筛选问题
    function renderclick(start, anum) {
        $.ajax({
            type: 'post',
            url: prefix + "/QAComm/reply",
            data: JSON.stringify({ "questionLabel1": ftag, "start": start, "rows": anum  }),
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
                    listq();
                }
            }
        })
    }



    //上一页
    apre.click(function () {
        anspre();
    })
    //下一页
    anext.click(function () {
        ansnext();
    })
        //上一页
        bpre.click(function () {
            banspre();
        })
        //下一页
        bnext.click(function () {
            bansnext();
        })
         //上一页
         cpre.click(function () {
            canspre();
        })
        //下一页
        cnext.click(function () {
            cansnext();
        })







    //筛选问题
    filter.click(function () {
        initato();
    })

    //点击标签跳转
    $('#questions').click(function (e) {
        var jumptoItem;
        if($(e.target).hasClass("jumpto")){
            jumptoItem = $(e.target);
        if(jumptoItem.attr("id")!=undefined)
        ftag=jumptoItem.attr("id");
        initaclick();}
        else {
                var tagItem;
                // if ($(e.target).hasClass("li")) {
                //     tagItem = $(e.target);
                // } else {
                    tagItem = $(e.target).parents(".li");
                //}
                //获取问题id
                qid = tagItem.attr("id");
                window.location.href = '../QAComm/answer1.html?index=' + qid;
            }
      })



    $(".topBar .answerNav").click(function () {
       location.reload();
    })


}.call(this));


