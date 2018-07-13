(function () {
    var upload = $("#upload");
    var inst = new mdui.Dialog('#upload_dialog', { 'overlay': true, 'destroyOnClosed': true });
    upload.click(function () {
        inst.open();
    })
}.call(this));