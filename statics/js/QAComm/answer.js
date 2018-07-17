(function () {  
var help = $('#help');//点击进入选择标签
var anstop = $('#anstop');
var answer = undefined;

var ans = new mdui.Dialog('#help_dialog', { 'overlay': true, 'destroyOnClosed': true });
    help.click(function () {
             ans.open();
      })

      close=document.getElementById("closeq");//关闭问题
      close.onclick=function(){
          close.disabled=true;
          var textdelete=document.createElement("del");
          textdelete.innerText="已关闭";
          close.appendChild(textdelete);
      }

rendera();
}.call(this));


//渲染后台返回的结果
function rendera() {
    var result = new Array(10);
    var len = result.length;
    for (var r = 0; r < len; r++) {
        result[r] = r;
    }
    // $.ajax({
    //     type: 'post',
    //     url: "http://localhost:8080/QAComm/reply",
    //     data: JSON.stringify({"ftag": ftag}),
    //     contentType: "application/json;charset=UTF-8",
    //     dataType: "json", //预期服务器返回类
    //     success: function (data) {
    //         if (data.status != 200) {
    //             alert(data.msg);
    //         } else {
    //             var aresult=data.data;//把json的data取出来
        
           for(var k = 0; k < len; k++){
               //alert(len);
            var div=document.createElement("div");
            div.className="mdui-rowa";
            div.innerText=result[k];
            //" 在C、Java等语言的语法中规定，必须以分号作为语句结束的标识。Python也支持分号，同样用于一条语句的结束标识。但在Python中分号的作用已经不像C、Java中那么重要了，Python中的分号可以省略，主要通过换行来识别语句的结束。在C、Java等语言的语法中规定，必须以分号作为语句结束的标识。Python也支持分号，同样用于一条语句的结束标识。但在Python中分号的作用已经不像C、Java中那么重要了，Python中的分号可以省略，主要通过换行来识别语句的结束。"
            var div1=document.createElement("div");
            div1.className="mdui-rowa";
            var button=document.createElement("button");
            button.className="mdui-btn-group button";
            button.style="color: rgb(1,102,144);font-size: 15px;border-radius: 5px";
            var i=document.createElement("i");
            i.className="mdui-icon material-icons";
            i.innerText="thumb_up";
            var span=document.createElement("span");
            span.innerText="count";
            button.appendChild(i);
            button.appendChild(span);
            div1.appendChild(button);
            var span1=document.createElement("span");
            span1.innerText="name";//
            span1.style="margin-left:380px;";
            var span2=document.createElement("span");
            span2.className="mdui-col-offset-md-1"
            var button2=document.createElement("button");
            button2.className="mdui-btn-group button";
            button2.innerText="tag";//
            button2.style="border-color: rgb(43,51,59);color: rgb(43,51,59);font-size: 15px;border-radius: 5px;left:15px;";
            var span3=document.createElement("span");
            span3.className="mdui-col-offset-md-1";
            span3.innerText="time";//
            span2.appendChild(button2);
            div1.appendChild(span1);
            div1.appendChild(span2);
            div1.appendChild(span3);
            var div2=document.createElement("div");
            div2.className="mdui-rowc";
            var div3=document.createElement("div");
            div3.className="mdui-divider-dark";
            div2.appendChild(div3);
            anstop.appendChild(div);
            anstop.appendChild(div1);
            anstop.appendChild(div2);
        }
          
    }
// }})
// }

