(function () {  
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var tags = undefined;
    var ftag = undefined;
    //dom obj
    var ask = $('#ask'); //提问按钮，点击求猿
    var filter = $('#filter');//点击传标签获得相应问题
    var apre = $('#apre');  // 上翻页
    var anext = $('#anext');//下翻页
    var atable = $('#questions');
    var indexa = 1; //当前位于第几页
    var num = 7; //一页最多显示多少个
    var aresult = new Array(2);
    var alen = aresult.length;
    var alastIndex = Math.floor(alen / num) + 1; //最多显示到第几页
    //上一页
    apre.click(function () {
     anspre();
    })
    //下一页
    anext.click(function(){
       ansnext(); 
    })
    ask.click(function () { 
        askquestions(); 
      })
    filter.click(function(){
        showq();
    })
  
    function askquestions() {
        title = $("#title").val();//问题标题
        description = $("#description").val();//问题描述
        tags = $("#tags").val();//标签
        alert( title + " " + description + " " + tags);
        $.post("/QAComm/quiz",
             {
                 title: title,
                 description: description,
                 tags: tags,
                    },
                function (data, status) {
                    alert("数据: " + data + "\n状态: " + status);
                 });        
  }
    function showq() {
        ftag = $("#ftag").val();//输入的标签
        alert(ftag);
        $.post("/QAComm/reply",
        {
            tag:ftag,
        },
        function (data, status) {
            alert("数据: " + data + "\n状态: " + status);
         }
        );
      }


      function ansnext(){
        atable.empty()
        if (indexa == 1) {  //当前是第一页
            apre.css("visibility", "visible");
        }
        if (indexa == (alastIndex - 1)) //当前是倒数第二页
        {
            anext.css("visibility", "hidden");
        }
        indexa++;
        rendera();
    
      }

      function anspre(){
        atable.empty()
     if (indexa == alastIndex) {  //当前是最后一页
         anext.css("visibility", "visible");
     } if (indexa == 2) //当前是第二页
     {
         apre.css("visibility", "hidden");
     }
     indexa--;
     rendera();
 
     }

       
//初始化
function inita() {
    apre.css("visibility", "hidden");
    if (alen <= num) {
        anext.css("visibility", "hidden");
    }
    rendera();
    
}
  inita();




var open = $('#open');//点击进入选择标签
var inst = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
             inst.open();
      })

//渲染后台返回的结果
function rendera() {
    // $.ajax({
    //     type: 'post',
    //     url: "http://localhost:8080/QAComm/reply",
    //     data: JSON.stringify({"tag": tag}),
    //     contentType: "application/json;charset=UTF-8",
    //     dataType: "json", //预期服务器返回类
    //     success: function (data) {
    //         if (data.status != 200) {
    //             alert(data.msg);
    //         } else {
    //             var aresult=data.data;//把json的data取出来
    //             if(alen<=4)
    //     {
    //         $('.page i').css("display","none");
    //     }
    for (var i = (indexa - 1) * num; i < (indexa - 1) * num + num; i++) {
        if (i >= alen)
            break;
            var li=document.createElement("li");
            li.className="mdui-list-item";
            var div=document.createElement("div");
            div.className="mdui-list-item-content";
            var div1=document.createElement("div");
            div1.className="mdui-list-item-title font1";
            div1.innerText=aresult[i];
            var span=document.createElement("span");
            span.style="color: gray;left: 10px";
            var i=document.createElement("i")
            i.className= "mdui-icon material-icons";
            i.local_offer;
            i.innerText="tags";
            var span1=document.createElement("span");
            span1.style="margin-left:330px";
            span1.innerText="count";
            var span2=document.createElement("span");
            span2.style="margin-left:30px";
            span2.innerText="time";
            var li1=document.createElement("li");
            li1.className="mdui-divider-inset mdui-m-y-0";
            span.appendChild(i);
            div1.appendChild(span);
            div.appendChild(div1);
            li.appendChild(div);
            li.appendChild(span1);
            li.appendChild(span2);
            atable.append(li);  
            atable.append(li1);            
    }
    $('.indexa').text(indexa);}
// }})
// }
}.call(this));