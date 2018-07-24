(function () {



    // 前后端传输数据
    var username = undefined;
    var password = undefined;
    var repassword = undefined;
    var type = undefined;
    // 程序用到的辅助数据
    var flag = 0;//登陆者的身份 0-学生  1-教师
    var signin = true;//默认为登陆
    var user = false; //用户名格式
    var pass = false; //密码格式
    var repass = true //再次输入密码的格式
    var passEqual = false; //两次密码是否相等
    //dom obj
    var open = $('#open');
    var submit = $('.submit');     //提交按钮,点击发送请求。
    var in_up = $('.in_up');       //切换登陆/注册
    var switchID = $('#switchID'); //登陆时切换身份button
    var identity = $('#identity'); //登陆时的身份显示

    var prefix = "http://localhost:8080";

    //初始化
    (function init() {
        addEvent();
        if (document.cookie != "") {
            var cookieUser = $.cookie("username").replace(/\"/g, "");
            open.text(cookieUser);
            open.attr("disabled", "disabled");
            open.unbind();
            $("#signout").show();
        }
        else {
            $("#signout").hide();
        }
    })();

    // 改变登陆者的身份(学生/教师)
    function switchIdentity() {
        if (flag == 0) //切换到教师 
        {
            flag = 1;
            switchID.html('切换到学生'); //可以切换到学生
            identity.html('教师'); //当前身份
        }
        else{ //切换到学生
            flag = 0;
            switchID.html('切换到教师'); //可以切换到学生
            identity.html('学生'); //当前身份
            $("#admin").css("visibility","visible");
            $('.to_in_up').css("visibility","visible");
            $('.sign_top').css("backgroundColor","#016690");
        }
    }
    // 更换状态(登陆/注册)
    function switch_in_up() {
        if (signin) //切换到注册
        {
            signin = false;
            in_up.html(' 登陆');
            submit.html('注册');
            inst.close();
            inst = new mdui.Dialog('#signup_dialog', { 'overlay': true, 'destroyOnClosed': true });
            inst.open();
        }
        else {
            signin = true;
            in_up.html(' 注册');
            submit.html('登陆');
            inst.close();
            inst = new mdui.Dialog('#signin_dialog', { 'overlay': true, 'destroyOnClosed': true });
            inst.open();
        }
    }


    //登陆
    function sign_in() {
        if (!user) {
            alert("帐户名只能为数字或者字母,且最小3位");
        } else {
            if (!pass) {
                alert("密码最少8位");
            }
            else {
                type = flag;
                type = flag;
                // alert(username + " " + password + " " + type);
                $.ajax({
                    type: 'post',
                    url: prefix + "/sign/in",
                    data: JSON.stringify({ "username": username, "password": password, "type": type }),
                    contentType: "application/json;charset=UTF-8",
                    xhrFields: {
                        withCredentials: true
                    },
                    dataType: "json", //预期服务器返回类
                    success: function (data) {
                        if (data.status != 200) {
                            alert(data.msg);
                        } else {
                            open.text(username);
                            open.attr("disabled", "disabled");
                            open.unbind();
                            $("#signout").show();
                        }
                    }
                });
            }
        }
        inst.close();
    }
    //注册
    function sign_up() {
        if (!user) {
            alert("帐户名只能为数字或者字母,且最小3位");
        } else {
            if (!pass || !repass) {
                alert("密码最少8位");
            }
            else {
                if (!passEqual) {
                    alert("两次密码不一致");
                }
                else {
                    type = $('#status').val();
                    // alert(username + " " + password + " " + repassword + " " + type);

                    $.ajax({
                        type: 'post',
                        url: "http://localhost:8080/sign/up",
                        data: JSON.stringify({ "username": username, "password": password, "type": type }),
                        contentType: "application/json;charset=UTF-8",
                        dataType: "json", //预期服务器返回类
                        success: function (data) {
                            if (data.status != 200) {
                                alert(data.msg);
                            } else {
                                open.text(username);
                                open.attr("disabled", "disabled");
                                open.unbind();
                            }
                        }
                    });
                }

            }
        }

        inst.close();

    }

    //事件注册
    var inst = new mdui.Dialog('#signin_dialog', { 'overlay': true, 'destroyOnClosed': true });
    function addEvent() {

        //点击进入登陆/注册框界面
        open.click(function () {
            inst.open();
        })

        //切换身份
        switchID.click(function (e) {
            switchIdentity();
        })

        //切换状态
        in_up.click(function (e) {
            switch_in_up();
        })

        //切换到管理员登陆
        $("#admin").click(function () {
            flag = 2;
            $("#admin").css("visibility","hidden");
            $('.to_in_up').css("visibility","hidden");
            switchID.html('切换到学生'); //可以切换到学生
            identity.html('管理员'); //当前身份
            $('.sign_top').css("backgroundColor","#191970");
            
            
        })

        //登陆/注册

        submit.click(function () {
            if (signin) {
                sign_in();
            }
            else {
                sign_up();
            }
        })

        //获取用户名并验证格式
        $('.username').change(function (e) {
            username = $(e.target).val();
            var regs = /^\w{3,10}$/;
            if (!regs.test(username)) {
                user = false;
                alert("帐户名只能为数字或者字母,且最小3位");
            } else {
                user = true;
            }
        })
        //获取密码并验证格式
        $('.password').change(function (e) {
            password = $(e.target).val();
            if (password.length < 8) {
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
                if (password != repassword) {
                    passEqual = false;
                    alert("两次密码不一致");
                } else {
                    passEqual = true;
                }
            }
        })

        //注销
        $("#signout").click(function () {
            $.cookie('username', '', { expires: -1 })
            $.cookie('id', '', { expires: -1 })
            $.cookie('type', '', { expires: -1 })
            alert("退出成功");
            location.reload();
        })

    }




}.call(this));