(function () {
    // 前后端传输数据
    var password = undefined;
    var newpassword = undefined;
    var repassword = undefined;

    // 程序用到的辅助数据
    var pass = false; //密码格式
    var repass = true //再次输入密码的格式
    var passEqual = false; //两次密码是否相等
    //dom obj
    var submit = $('#submit');     //提交按钮,点击发送请求。
    submit.click(function () {
        $('.text').val(undefined);
        pass = false; //密码格式
        repass = true //再次输入密码的格式
        passEqual = false; //两次密码是否相等
        changepassword();
    })
    function changepassword() {
        if (!pass || !repass) {
            alert("密码格式不正确(最少8位)");
        }
        else {
            if (!passEqual) {
                alert("两次密码不一致");
            }
            else {
                password = $("#password").val();   //原密码
                newpassword = $("#newpassword").val();   //新密码
                $.ajax({
                    type: 'post',
                    url: "http://localhost:8080/profile/modifyPass",
                    data: JSON.stringify({ "password": password, "newpassword": newpassword }),
                    contentType: "application/json;charset=UTF-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json", //预期服务器返回类
                    success: function (data) {
                        if (data.status != 200) {
                            alert(data.msg);
                        } else {
                            alert("密码修改成功！");
                            $('.text').val("");
                        }
                    }
                });
            }
        }
    }

    //获取新密码并验证格式
    $('#newpassword').change(function (e) {
        newpassword = $(e.target).val();
        if (newpassword.length < 8) {
            pass = false;
            alert("密码最少8位");
        } else {
            pass = true;
        }
    })
    //获取第二次密码并验证两次密码是否相等
    $('#repassword').change(function (e) {
        repassword = $(e.target).val();
        if (repassword.length < 8) {
            repass = false;
            alert("密码最少8位");
        } else {
            repass = true;
            if (newpassword != repassword) {
                passEqual = false;
                alert("两次密码不一致");
            } else {
                passEqual = true;
            }
        }
    })

    function showa() {
        $("#tab1").show();//显示tab1
        $("#tab2").hide();
        $("#tab3").hide();
    }
  
    //页面切换
    $('#taba').click(function () {
        showa();
    })
  
}.call(this));





