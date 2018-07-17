(function () {  
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var tags = [];
    var tag0 = undefined;
    var tag1 = undefined;
    var tag2 = undefined;
    var question=undefined;
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


    save.on("click",function(){
        tag0 = $("#0").text();
        tag1 = $("#1").text();
        tag2 = $("#2").text();
        alert(tag0);alert(tag1);alert(tag2);
        
    })

    function askquestions() {
        title = $("#title").val();//问题标题
        description = $("#description").val();//问题描述
        tags[0]=tag0;
        tags[1]=tag1;
        tags[2]=tag2;
        alert( title + " " + description + " " + tags);
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/QAComm/quiz",
            data: JSON.stringify({ "title": title, "description": description,"tags": tags}),
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
    anext.click(function(){
       ansnext(); 
    })
    ask.click(function () { 
        askquestions(); 
      })
    filter.click(function(){
        rendera();
    })

    //智能搜索
    function searchq(){
        question = $("#question").val();   //问题
        alert(question);
        $.ajax({
        type: 'post',
        url: "http://localhost:8080/QAComm/search",
        data: JSON.stringify({"question": question}),
        contentType: "application/json;charset=UTF-8",
        dataType: "json", //预期服务器返回类
        success: function (data) {
            if (data.status != 200) {
                alert(data.msg);
            } else{
                //??
            }
    }
})}
    
    //伸出猿手
      function ansnext(){
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

      function anspre(){
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
    //             [...aresult]=data.data;//把json的data取出来
    //             if(alen<=anum)
    //     {
    //         $('.page i').css("display","none");
    //     }
    for (var i = (aindex - 1) * anum; i < (aindex - 1) * anum + anum; i++) {
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
            i.innerText="local_offer";
            var span3=document.createElement("span");
            span3.innerText="tags";
            var span1=document.createElement("span");
            span1.style="margin-left:330px";
            span1.innerText="count";
            var span2=document.createElement("span");
            span2.style="margin-left:30px";
            span2.innerText="time";
            var li1=document.createElement("li");
            li1.className="mdui-divider-inset mdui-m-y-0";
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
    $('.aindex').text(aindex);}
// }})
// }



//我要求猿
var open = $('#open');//点击进入选择标签
var inst = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
             inst.open();
      })


    

    
    
  function oktag(){
    var inputField=undefined;
    inputField = $("#tags").val();
    var div=document.createElement("div");
        div.className="mdui-chip";
        var span=document.createElement("span");
        span.className="mdui-chip-title";
        span.innerText=inputField;
        var span1=document.createElement("span");
        span1.className="mdui-chip-delete";
        var i=document.createElement("i");
        i.className="mdui-icon material-icons";
        i.innerText="cancel";
        span1.appendChild(i);
        div.appendChild(span);
        div.appendChild(span1);
        selected .append(div);

}

$("#demo").change(function(){
    var options=$("#demo option:selected");  //获取选中的项
    //alert(options.val());   //拿到选中项的值 
    if(options.val()&& ($(".mdui-chip").length<3)){
        //alert(options.val());//第一个取不到为什么？？？？？？？？
        var div=document.createElement("div");
        div.className="mdui-chip";
        var span=document.createElement("span");
        span.className="mdui-chip-title";
        span.id=$(".mdui-chip-title").length;
        span.innerText=options.val();
        var span1=document.createElement("span");
        span1.className="mdui-chip-delete";
        var i=document.createElement("i");
        i.className="mdui-icon material-icons del";
        i.innerText="cancel";
        span1.appendChild(i);
        div.appendChild(span);
        div.appendChild(span1);
        selected.append(div);
        //alert($('.mdui-chip-title').length);
        $(".del").click(function(){
            alert("a");
        })
    }


    $('#tags').val("");
});

}.call(this));





var a= $('#append');//自动匹配
//自动匹配
function find() {
    var inputField=undefined;
    inputField = $("#tags").val();
    //alert(inputField);
    // var data=new Array(11);
    // var len=data.length;
    // for(var r=0;r<len;r++)
    // data[r]=r;
    var arr=new Array;
    var data = [
        "0",
        "13",
        "101",
        "122",
        "10000",
        ];
        var len=data.length;
        var j=0;
    for (var i = 0; i < len; i++) {
        //alert(data[i]);
        //alert((data[i]).indexOf(inputField));
          if ((data[i]).indexOf(inputField)>=0){
            //alert(data[i]);
            // arr.push(data[i]);
            arr[j]=data[i];
            j++;
            //alert(arr[i]);
          }
     }
     set(arr);
}

var inst = $('#demo');//自动匹配
//将符合的建议项逐条放置于弹出框中
function set(arr) {            
    var size = arr.length;
    var nextNode=undefined;
    //alert(size);
   // for(var i=0;i<size;i++){alert(arr[i]);}
    //setOffsets();
    //alert($("#tags").val());
   if(size>0) {inst.css("display","block"); }
   else if(size==0||$('#tags').val==""){inst.css("display","none"); }
    $('#demo').empty();
    for (var i = 0; i < size; i++) {
        var nextNode = arr[i];
        //alert(nextNode+i);
        $('#demo').append('<option>'+nextNode+'</option>');
  //inst.handleUpdate();
  
  mdui.mutation();
        //cell.onclick = function() { populate(this); } ;  //鼠标点击选项给输入框赋值          
    }
}

var cancell = $('#cancell');//取消 清空
cancell.click(function () {
    clear();
  })
function clear(){
    inst.css("display","none");
    $('#tags').val("");
    $('#selected').empty();
}


