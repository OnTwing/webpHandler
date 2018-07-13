1. install
npm install webp-handler

2. api
    (1) Flags & isClientSupportWebp();
    import them both if you want to check whether the client support webp
    and call isClientSupportWebp();

    (2) webpServerConfig(...domains);
    this api will return an Object contains the src of your img that can be transfered to webp when you pass in an array or a few arguments
    you must call this before img2webp()!
    example:
        let webpSupportServer = webpServerConfig(['aaa.net','bbb.net','ccc.net']);
        let webpSupportServer = webpServerConfig('aaa.net','bbb.net','ccc.net');

    (3) img2webp(webpSupportServer,img.src);
    this api will transfer png/jpg/gif to webp,call this after webpServerConfig()
    
        