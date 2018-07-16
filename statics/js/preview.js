(function () {  

    var inst = new mdui.Dialog('#resource_detail', { 'overlay': true, 'destroyOnClosed': true });
    $('.preview').click(function (e) {  
        inst.open();
    });

    // $('.downloadBtn').click(function(){
    //     var $eleForm = $("<form method='get'></form>");

    //     $eleForm.attr("action","https://codeload.github.com/douban/douban-client/legacy.zip/master");

    //     $(document.body).append($eleForm);

    //     //提交表单，实现下载
    //     $eleForm.submit();
    // });
}.call(this));