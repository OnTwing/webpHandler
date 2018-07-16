## install
npm install webp-handler

#build
npm run buildcjs (commonjs)
npm run buildes  (es5)

## api
### isClientSupportWebp()
* import this if you want to check whether the client support webp
    > and call isClientSupportWebp();

### webpServerConfig(...domains)
* this api will return an Object contains the src of your img that can be transfered to webp when you pass in an array or a few arguments 
* you must call this before img2webp()!
> example:
        let webpSupportServer = webpServerConfig(['aaa.net','bbb.net','ccc.net']);
        let webpSupportServer = webpServerConfig('aaa.net','bbb.net','ccc.net');

### img2webp(servers.img) ###
* this api will transfer png/jpg/gif to webp,call this after webpServerConfig()
    
        