## install
npm install webp-handler

## browser version
### how to use
* var webpHandler = require('webp-handler)
* var instance    = new webpHandler({servers:['aaa.com','bbb.com','ccc.com']})
* var webpimgUrl  = instance.img2webp(imgurl)

### api
* new webpHadler(options) => options is an object includes __servers(required)__ and time
servers are the domain that you store your static resource,time is the cookie expiretime(day)

* img2webp(imgurl) => imgurl must be complete

## node version
### how to use
* var webpHandler = require('webp-handler)
* var instance    = new webpHandler({servers:['aaa.com','bbb.com','ccc.com'],cookie:yourcookie})
* var webpimgUrl  = instance.img2webp(imgurl)
    
### api
* new webpHadler(options) => options is an object includes __servers(required)__ and __cookie(required)__
servers are the domain that you store your static resource
* cookie's name is __webp_support__ ,u need to get it first

* img2webp(imgurl) => imgurl must be complete