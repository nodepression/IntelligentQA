(function () {

    var newName = $('.newName').val();
    var oldName = " ";





    //打开文件上传框
    var upload = $("#upload");
    var inst = new mdui.Dialog('#upload_dialog', { 'overlay': true, 'destroyOnClosed': true });
    upload.click(function () {

        if (document.cookie == "") {
            alert("请先登陆");
        } else {
            //获取上传资源时所选择的tags
            $('.tag1').val(tag1);
            $('.tag2').val(tag2);
            $('.tag3').val(tag3);
            inst.open();
        }

    })

    //文件选择
    $('.fileChoose').click(function (e) {
        $('#realFile').click();
    })
    $('#realFile').change(function (e) {
        oldName = $('#realFile').val().split("\\")[2];
        $('.fileChoose').text(oldName);
    })

    //给上传的文件取名
    $('.newName').change(function (e) {
        newName = $('.newName').val();
    })

    //文件上传
    $('#uploadButton').click(function () {


        if (newName != " ") {
            if (oldName != " ") {
                uploadFile();
            } else {
                alert("请选择文件");
            }
        }
        else {
            alert("请输入文件名");
        }
    })

    //取消上传
    $('#cancel').click(function (e) {
        inst.close();
    })


    function uploadFile() {
        var formData = new FormData($('#file')[0]);
        inst.close();
        $.ajax({
            type: 'POST',
            url:  prefix + "/resource/upload",
            data: formData,
            cache: false,
            processData: false,
            contentType: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                    alert("上传成功");
                    // alert($('.tag1').val() + " " + $('.tag2').val() + " " + $('.tag3').val());
                }
            }
        })
    }

}.call(this));