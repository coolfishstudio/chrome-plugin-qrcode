$(function () {
    //转字符码
    function utf16to8 (str) {
        var out, i, len, c;
        out = '';
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }
    //生成二维码
    function qrcode (text) {
        $('#qrcodeBox').qrcode({
            height: 230,
            width: 230,
            text: utf16to8(text),
            background: '#FFF',//背景颜色
            foreground: '#000'//前景颜色
        });
    }

    chrome.tabs && chrome.tabs.getSelected && chrome.tabs.getSelected(null, function (tab) { 
        qrcode(tab.url);
    });
});