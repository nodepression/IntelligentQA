(function () {

    var cards = $('.card');
    var seconds = $('.second');
    var tags = [
        { first: "前端", "second": ["React.js", "Vue.js", "Node.js", "html/css", "Javascript", "Angular.js", "jQuery", "Bootstrap", "Sass/Less", "前端工具"]},
        { first: "后台", "second": ["Java", "SpringBoot", "C++", "Python", "爬虫", "Django", "go", "PHP", "Ruby", "C"] },
        { first: "移动", "second":  ["Android", "iOS", "ReactNative", "WEEX"]},
        { first: "云计算和大数据", "second": ["云计算 ", "大数据", "Hadoop"]},
        { first: "算法和数学", "second": ["算法与数据结构"] },
        { first: "运维和测试", "second":["运维", "自动化测试", "Linux", "测试", "功能测试", "性能测试", "自动化测试", "接口测试", "安全测试"]},
        { first: "数据库", "second": ["MySQL", "Redis", "MongoDB", "Oracle", "SQL Server"]},
        { first: "ui设计", "second":["模型制作", "动效动画", "设计基础", "设计工具", "APPUI设计", "产品交互"]},
        { first: "前沿", "second":["区块链", "人工智能", "计算机视觉", "微服务", "以太坊", "机器学习", "深度学习", "数据分析"]},
        { first: "游戏", "second": ["Unity3D", "Cocos2d-x"] }
    ];


    //初始化二级栏目
    function initSecond() {
        var index;
        for (index = 0; index < 10; index++) {
            var len = tags[index].second.length;
            var i;
            if (len <= 3) {
                for (i = 0; i < len; i++) {
                    var item = document.createElement("span");
                    item.className = "sencond_item";
                    item.innerHTML = tags[index].second[i]
                    seconds[index].append(item);
                }
            } else {
                for (i = 0; i < 3; i++) {
                    var item = document.createElement("span");
                    item.innerHTML = tags[index].second[i]
                    item.className = "sencond_item";
                    seconds[index].append(item);
                }
                var item = document.createElement("span");
                item.className = "sencond_item";
                item.innerHTML = "其他";
                seconds[index].append(item);
            }
        }
    }
    initSecond();
    //初始化到登录后显示的界面
    function init() {
        $(".second").css("z-index", "-1");
        $(".second").removeClass('animated bounceInRight');
    }

    //鼠标移入时的动画
    $('.card').mouseover(function (e) {
        timer = setTimeout(function () {
            $(e.target).children(".second").css("z-index", "2");
            $(e.target).children(".second").addClass('animated bounceInRight');
            // var index = Array.prototype.indexOf.call(cards, e.target);
        }, 200);
    });
    $('.card').mouseout(function () {
        clearTimeout(timer);
    })

    //鼠标移出时
    $(".second").mouseleave(function () {
        init();
    })

    $('.firstType').click(function(e){
        var target = $(e.target);
        if(target.hasClass('sencond_item'))
        {   
            var firstTag = target.parent().parent();
            var index1 = Array.prototype.indexOf.call(firstTag.parent().children(), firstTag[0]); //方向索引(一级)
            var index2 = Array.prototype.indexOf.call(target.parent().children(), e.target);      //分类索引(二级)
            window.location.href='./views/resource/category.html?index1='+ index1 + "&index2=" + index2;
        }
    })
}.call(this));