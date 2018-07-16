(function () {

    var newName =$('.newName').val();
    var oldName =" ";

    

    //获取上传资源时所选择的tags
    $('.tag1').val(tag1);
    $('.tag2').val(tag2);
    $('.tag3').val(tag3);

    //打开文件上传框
    var upload = $("#upload");
    var inst = new mdui.Dialog('#upload_dialog', { 'overlay': true, 'destroyOnClosed': true });
    upload.click(function () {
        inst.open();
    })

    //文件选择
    $('.fileChoose').click(function (e) {  
        $('#realFile').click();
    })
    $('#realFile').change(function (e) {  
        oldName =  $('#realFile').val().split("\\")[2];
        $('.fileChoose').text(oldName);
    })

    //给上传的文件取名
    $('.newName').change(function (e) {  
        newName = $('.newName').val();
    })

    //文件上传
    $('#uploadButton').click(function(e){
        if(newName!=" ")
        {   
            if(oldName!=" ")
            {
                $("#realUploadButton").click();
            }else{
                alert("请选择文件");
            }
        }
        else{
            alert("请输入文件名");
        }
    })

    //取消上传
    $('#cancel').click(function (e) {  
        inst.close();
    })

}.call(this));