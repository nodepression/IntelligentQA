(function () {
    // 资源对应的标签
    var one,   //一级
        two,   //二级
        three; //三级

    var index = 1;
    var result = new Array(11);
    var tags = [
        { "前端": ["React.js", "Vue.js", "Node.js", "html/css", "Javascript", "Angular.js", "jQuery", "Bootstrap", "Sass/Less", "前端工具"] },
        { "后台": ["Java", "SpringBoot", "C++", "Python", "爬虫", "Django", "go", "PHP", "Ruby", "C"] },
        { "移动": ["Android", "iOS", "ReactNative", "WEEX"] },
        { "云计算和大数据": ["云计算 ", "大数据", "Hadoop"] },
        { "算法和数学": ["算法与数据结构"] },
        { "运维和测试": ["运维", "自动化测试", "Linux", "测试", "功能测试", "性能测试", "自动化测试", "接口测试", "安全测试"] },
        { "数据库": ["MySQL", "Redis", "MongoDB", "Oracle", "SQL Server"] },
        { "UI设计": ["模型制作", "动效动画", "设计基础", "设计工具", "APPUI设计", "产品交互"] },
        { "前沿": ["区块链", "人工智能", "计算机视觉", "为服务", "以太坊", "机器学习", "深度学习", "数据分析"] },
        { "游戏": ["Unity3D", "Cocos2d-x"] }
    ];

    function render() {
        if(result.length<=20)
        {
            $('.page i').css("display","none");
        }
        for (var i = 0; i<result.length; i++) {
            var file = document.createElement("div");
            file.className= "item";

            var pic = document.createElement("img");
            pic.src = "../../statics/images/pdf.png";

            var text = document.createElement("div");
            text.innerText = "哈哈哈";
            file.appendChild(pic);
            file.appendChild(text);
            $('.result').append(file);
        }
    }
    render();


    $('.first').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            one = $(e.target).text();
            $(".first>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");
        }
    })
    $('.second').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            two = $(e.target).text();
            $(".second>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");
        }
    })
    $('.third').click(function (e) {
        if ($(e.target).hasClass("tag")) {
            three = $(e.target).text();
            $(".third>.tag").css("backgroundColor", "white");
            $(e.target).css("backgroundColor", "#6db7d5");
        }
    })

}.call(this));