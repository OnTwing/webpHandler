const Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
}

let getDomainFromImgUrl = function (url) {
    let matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/)

    if (!matchRes) {
        return ''
    }
    return matchRes[2]
}

class webp_handler{
    constructor(options={servers:[],cookie:""}){
        this.servers = {};
        //设置静态资源服务器域名
        for(let server of options.servers){
            this.servers[server] = 1
        }
        //设置cookie是否支持
        this.isClientSupportWebp = (options.cookie==Flags.Browser_Support?true:false);
    }
    //img必须为完整的url
    img2webp(img) {
        let isServerSupportWebp = this.servers[getDomainFromImgUrl(img)];
        if (!this.isClientSupportWebp || !isServerSupportWebp) {
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
