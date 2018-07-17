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

var Flags = {
    Browser_Support: '1',
    Browser_Unsupport: '2'
};

var getDomainFromImgUrl = function getDomainFromImgUrl(url) {
    var matchRes = url.match(/^(http)?s?\:?\/\/([^\/]*)/);

    if (!matchRes) {
        return '';
    }
    return matchRes[2];
};

var webp_handler = function () {
    function webp_handler() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { servers: [], cookie: "" };
        classCallCheck(this, webp_handler);

        this.servers = {};
        //设置静态资源服务器域名
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = options.servers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var server = _step.value;

                this.servers[server] = 1;
            }
            //设置cookie是否支持
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

        this.isClientSupportWebp = options.cookie == Flags.Browser_Support ? true : false;
    }
    //img必须为完整的url


    createClass(webp_handler, [{
        key: 'img2webp',
        value: function img2webp(img) {
            var isServerSupportWebp = this.servers[getDomainFromImgUrl(img)];
            if (!this.isClientSupportWebp || !isServerSupportWebp) {
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
