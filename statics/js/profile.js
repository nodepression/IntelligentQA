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
//   var pre = $('#pre');  // 上翻页
  submit.click(function () {
    changepassword();
  })
//   pre.click(function (){
//       count--;
//   })
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
                alert( password + " " + newpassword + " " + repassword);
                $.post("/profile/modifyPass",
                    {
                        password: password,
                        newpassword: newpassword,
                    },
                    function (data, status) {
                        alert("数据: " + data + "\n状态: " + status);
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
}.call(this));


function showa(){ 
  $("#tab1").show();//显示tab1
  $("#tab2").hide();
  $("#tab3").hide();
  }
function showb(){ 
  $("#tab1").hide();
  $("#tab2").show();//显示tab2
  $("#tab3").hide();
  $("#tab3").myr;
  }
function showc(){ 
  $("#tab1").hide();
  $("#tab2").hide();
  $("#tab3").show();//显示tab3
  $("#tab3").myq;
  }

      var title=undefined;
      var time=undefined;
      var count=undefined;
      var status=undefined;
function myq() {
                $.post("/profile/myQuestion","",
                    function (data, status) {
                        if (data.status != 200) {
                            alert(data.msg);
                        } else {
                        alert("数据: " + data + "\n状态: " + status);
                        var html="";
                        var jsonData=data.data;//把json的data取出来
                        for(var i in jsonData)//对data遍历
                        {
                        var index=i%4;
                        if(index=0){
                            html+='<div class="mdui-container-fluid" style="height: 83px;"><div class="mdui-row"><div class="mdui-col-xs-9 font1">'+jsonData[i].title+'</div><div class="mdui-col-xs-3">回答数目：'+jsonData[i].count+'</div></div><div class="mdui-row"><div class="mdui-col-xs-9 font1">发布时间：'+jsonData[i].time+'</div><div class="mdui-col-xs-3">status</div></div></div>'
                           // alert(html);
                            $("#q1").append(html);
                            mdui.mutation();
                            html="";}
                        if(index=1){ html+='<div class="mdui-container-fluid" style="height: 83px;"><div class="mdui-row"><div class="mdui-col-xs-9 font1">'+jsonData[i].title+'</div><div class="mdui-col-xs-3">回答数目：'+jsonData[i].count+'</div></div><div class="mdui-row"><div class="mdui-col-xs-9 font1">发布时间：'+jsonData[i].time+'</div><div class="mdui-col-xs-3">status</div></div></div>'
                        // alert(html);
                         $("#q2").append(html);
                         mdui.mutation();
                         html="";}
                        if(index=2){ html+='<div class="mdui-container-fluid" style="height: 83px;"><div class="mdui-row"><div class="mdui-col-xs-9 font1">'+jsonData[i].title+'</div><div class="mdui-col-xs-3">回答数目：'+jsonData[i].count+'</div></div><div class="mdui-row"><div class="mdui-col-xs-9 font1">发布时间：'+jsonData[i].time+'</div><div class="mdui-col-xs-3">status</div></div></div>'
                        // alert(html);
                         $("#q3").append(html);
                         mdui.mutation();
                         html="";}
                        if(index=3){ html+='<div class="mdui-container-fluid" style="height: 83px;"><div class="mdui-row"><div class="mdui-col-xs-9 font1">'+jsonData[i].title+'</div><div class="mdui-col-xs-3">回答数目：'+jsonData[i].count+'</div></div><div class="mdui-row"><div class="mdui-col-xs-9 font1">发布时间：'+jsonData[i].time+'</div><div class="mdui-col-xs-3">status</div></div></div>'
                        // alert(html);
                         $("#q4").append(html);
                         mdui.mutation();
                         html="";}
                    }}
                }
            )}


function myr() {
        $.post("/profile/myResource","",
            function (data, status) {
                if (data.status != 200) {
                    alert(data.msg);
                } else {
                alert("数据: " + data + "\n状态: " + status);
                var html="";
                var jsonData=data.data;//把json的data取出来
                var sum=jsonData.length;//获得数据条数
                for(var i in jsonData)//对data遍历
                {
                html+='<tr><td style="border:1px solid rgb(182, 172, 172)"><div class="mdui-container-fluid" style="height: 83px;"><div class="mdui-row"><div class="mdui-col-xs-5 font1">'+jsonData[i].title+'</div><div class="mdui-col-xs-4">上传时间：'+jsonData[i].time+'</div><div class="mdui-col-xs-3 font1">下载次数：'+jsonData[i].downloads+'</div></div></div></td></tr>'
                alert(html);
                $("#rtable").append(html);
                mdui.mutation();
            }}
        }
    )}