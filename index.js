import './cookie'

const Webp_Base64_Tester = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/uVqAAA=';
const Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
}

let getDomainFromImgUrl = function (url) {
    var matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/)

    if (!matchRes) {
        return ''
    }
    return matchRes[2]
}

let webpProbe = function (maxTime=3) {
    let img = new Image();
    img.onload = function () {
        if (img.height > 0 && img.width > 0) {
            cookie('webp_support','1',{
                expires : maxTime ,
            })
            Promise.resolve();
        } else {
            cookie('webp_support','2',{
                expires : maxTime ,
            })            
            Promise.reject()
        }
    };
    img.onerror = function () {
        cookie('webp_support','2',{
            expires : maxTime ,
        })
        Promise.reject()
    };
    img.src = Webp_Base64_Tester;
}

function webpServerConfig(...domains){
    let Support_Webp_Server = {};
    for(let domain of domains){
        Support_Webp_Server[domain] = 1;
    }
    return Support_Webp_Server;
}
//检测客户端是否支持webp
function isClientSupportWebp(time = 3 ){
    if(!cookie('webp_support')){
        webpProbe(time);
    }
}
let syncWebpChecker = function () {
    return localstorage.getItem('webp') === Flags.Browser_Support;
}
//img必须为完整的url
function img2webp(servers,img){
    let isServerSupportWebp = servers[getDomainFromImgUrl(img)];
    if (!syncWebpChecker() || !isServerSupportWebp) {
        return img
    }
    if (img.match(/[png|jpg|gif]$/)) {
        return img + '.webp';
    }
    var decodeImg = decodeURIComponent(img);
    if (decodeImg.match(/[png|jpg|gif]@/)) {
        var splitImg = decodeImg.split('@');
        if (splitImg.length > 2) {
            return img;
        } else {
            return splitImg[0] + '.webp@' + splitImg[1];
        }
    }
    return img
}
export default {Flags, isClientSupportWebp, img2webp , webpServerConfig}