let isFunction = function(obj){
    return Object.prototype.toString.call(obj) == '[object Function]';
};
let extend = function(obj){
    Array.prototype.slice.call(arguments, 1).forEach(function(source){
        if (source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    });
    return obj;
};


let pluses = /\+/g;

function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
}

function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
        s = decodeURIComponent(s.replace(pluses, ' '));
        return config.json ? JSON.parse(s) : s;
    } catch(e) {}
}

function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return isFunction(converter) ? converter(value) : value;
}

var cookie$1,config,removeCookie;

config = cookie$1 = function (key, value, options) {

    // Write

    if (value !== undefined && !isFunction(value)) {
        options = extend({}, config.defaults, options);

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setTime(+t + days * 864e+5);
        }

        return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
        ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        var name = decode(parts.shift());
        var cookie = parts.join('=');

        if (key && key === name) {
            // If second argument (value) is a function it's a converter...
            result = read(cookie, value);
            break;
        }

        // Prevent storing a cookie that we couldn't decode.
        if (!key && (cookie = read(cookie)) !== undefined) {
            result[name] = cookie;
        }
    }

    return result;
};

config.defaults = {};

removeCookie = function (key, options) {
    if (cookie$1(key) === undefined) {
        return false;
    }

    // Must not alter options, thus extending a fresh object...
    cookie$1(key, '', extend({}, options, { expires: -1 }));
    return !cookie$1(key);
};
cookie$1.remove = removeCookie;

window.Cookie = cookie$1;

const Webp_Base64_Tester = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/uVqAAA=';
const Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
};

let getDomainFromImgUrl = function (url) {
    let matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/);

    if (!matchRes) {
        return ''
    }
    return matchRes[2]
};

let webpProbe = function (maxTime=3) {
    let img = new Image();
    img.onload = function () {
        if (img.height > 0 && img.width > 0) {
            cookie('webp_support','1',{
                expires : maxTime ,
            });
        } else {
            cookie('webp_support','2',{
                expires : maxTime ,
            });            
            Promise.reject();
        }
    };
    img.onerror = function () {
        cookie('webp_support','2',{
            expires : maxTime ,
        });
        Promise.reject();
    };
    img.src = Webp_Base64_Tester;
};

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
};
//img必须为完整的url
function img2webp(servers,img){
    let isServerSupportWebp = servers[getDomainFromImgUrl(img)];
    if (!syncWebpChecker() || !isServerSupportWebp) {
        return img
    }
    let cookie = cookie('webp_support');
    if(!cookie==1){
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
var index = {isClientSupportWebp,img2webp,webpServerConfig};

export default index;
