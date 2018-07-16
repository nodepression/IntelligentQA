(function () {  

    var inst = new mdui.Dialog('#resource_detail', { 'overlay': true, 'destroyOnClosed': true });
    $('.preview').click(function (e) {  
        inst.open();
    });
}.call(this));