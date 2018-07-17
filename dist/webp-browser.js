'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Webp_Base64_Tester = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAD8D+JaQAA3AA/uVqAAA=';
var Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
};

var cookie = {
    get: function get$$1(key) {
        var data = document.cookie;
        var startIndex = data.indexOf(key + '=');
        if (startIndex > -1) {
            startIndex = startIndex + key.length + 1;
            var endIndex = data.indexOf(';', startIndex);
            endIndex = endIndex < 0 ? data.length : endIndex;
            return decodeURIComponent(data.substring(startIndex, endIndex));
        } else {
            return '';
        }
    },
    set: function set$$1(key, value, time) {
        var cur = new Date();
        var undefined = void 0;
        cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time === undefined ? '' : cur.toGMTString());
    }
};

var getDomainFromImgUrl = function getDomainFromImgUrl(url) {
    var matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/);

    if (!matchRes) {
        return '';
    }
    return matchRes[2];
};

var webpProbe = function webpProbe(maxTime) {
    var img = new Image();
    img.onload = function () {
        if (img.height > 0 && img.width > 0) {
            cookie.set('webp_support', '1', maxTime);
        } else {
            cookie.set('webp_support', '2', maxTime);
            Promise.reject();
        }
    };
    img.onerror = function () {
        cookie.set('webp_support', '2', maxTime);
        Promise.reject();
    };
    img.src = Webp_Base64_Tester;
};

var webp_handler = function () {
    function webp_handler() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { servers: [], time: 3 };
        classCallCheck(this, webp_handler);

        this.servers = {};
        this.cookie = "";
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = options.servers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var server = _step.value;

                this.servers[server] = 1;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!cookie.get('webp_support')) {
            webpProbe(options.time ? options.time : 3);
        }
        this.cookie = cookie.get('webp_support');
    }
    //img必须为完整的url


    createClass(webp_handler, [{
        key: 'img2webp',
        value: function img2webp(img) {
            var isServerSupportWebp = this.servers[getDomainFromImgUrl(img)];
            if (!this.cookie == Flags.Browser_Support || !isServerSupportWebp) {
                return img;
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
            return img;
        }
    }]);
    return webp_handler;
}();

module.exports = webp_handler;
