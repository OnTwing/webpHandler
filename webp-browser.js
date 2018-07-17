const Webp_Base64_Tester = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/uVqAAA=';
const Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
}

let cookie = {
    get:function(key){
        let data = document.cookie;
        let startIndex = data.indexOf(key+'=');
        if(startIndex>-1) {
            startIndex = startIndex+key.length+1;
            let endIndex = data.indexOf(';',startIndex);
            endIndex = endIndex<0 ? data.length:endIndex;
            return decodeURIComponent(data.substring(startIndex,endIndex));
        }else {
            return '';
        }
    },
    set:function(key,value,time){
        let cur = new Date();
        let undefined;
        cur.setTime(cur.getTime()+time*24*3600*1000);
        document.cookie = key+'='+encodeURIComponent(value)+';expires='+(time===undefined?'':cur.toGMTString());
    },
};

let getDomainFromImgUrl = function (url) {
    let matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/)

    if (!matchRes) {
        return ''
    }
    return matchRes[2]
}

let webpProbe = function (maxTime) {
    let img = new Image();
    img.onload = function () {
        if (img.height > 0 && img.width > 0) {
            cookie.set('webp_support','1',maxTime)
            Promise.resolve();
        } else {
            cookie.set('webp_support','2',maxTime)          
            Promise.reject()
        }
    };
    img.onerror = function () {
        cookie.set('webp_support','2',maxTime)
        Promise.reject()
    };
    img.src = Webp_Base64_Tester;
}


class webp_handler {
    constructor(options={servers:[],time:3}){
        this.servers = {};
        this.cookie = "";
        for(let server of options.servers){
            this.servers[server] = 1
        }
        if(!cookie.get('webp_support')){
            webpProbe(options.time?options.time:3);
        }
        this.cookie = cookie.get('webp_support');
    }
    //img必须为完整的url
    img2webp(img){
        let isServerSupportWebp = this.servers[getDomainFromImgUrl(img)];
        if (!this.cookie == Flags.Browser_Support || !isServerSupportWebp) {
            return img
        }
        if (img.match(/[png|jpg|gif]$/)) {
            return img + '.webp';
        }
        let decodeImg = decodeURIComponent(img);
        if (decodeImg.match(/[png|jpg|gif]@/)) {
            let splitImg = decodeImg.split('@');
            if (splitImg.length > 2) {
                return img;
            } else {
                return splitImg[0] + '.webp@' + splitImg[1];
            }
        }
        return img
    }
}
module.exports = webp_handler