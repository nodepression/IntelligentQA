(function () {  
    // 前后端传输数据
    var title = undefined;
    var description = undefined;
    var tags = undefined;
    var ftag = undefined;
    //dom obj
    var ask = $('#ask'); //提问按钮，点击求猿
    var filter = $('#filter');//点击传标签获得相应问题
    //var pre = $('#pre'); // 上翻页
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




  }.call(this));


var open = $('#open');//点击进入选择标签
var inst = new mdui.Dialog('#tag_dialog', { 'overlay': true, 'destroyOnClosed': true });
    open.click(function () {
             inst.open();
      })