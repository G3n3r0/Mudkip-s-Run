x$(window).on("load", function() {
    window.$ = x$;
    
    if (Touch.isSupported()) { Touch.enable(window.stage); }
    window.bullets = [];
    
    spd = [3,3];
    
    function Player(x,y,img) {
        this.spd = spd;
        this.img = img;
        this.x = x;
        this.y = y;
        //this.fdata = {f:0,b:1,r:2,l:3};
        /*this.fdata = {
            b1:0,
            b2: 1,
            b3: 2,
            r1: 3,
            r2: 4,
            r3: 5,
            f1: 6,
            f2: 7,
            f3: 8,
            l1: 9,
            l2: 10,
            l3: 11
        };*/
        this.fdata = {
            y1: 0,
            y2: 1,
            y3: 2,
            y4: 3,
            y5: 4,
            r1: 5,
            r2: 6,
            r3: 7,
            r4: 8,
            r5: 9
        };
        this.sSheet = new SpriteSheet(this.img, 39, 36,this.fdata);
        this.bs = new BitmapSequence(this.sSheet);
        this.bs.y = this.y;
        this.bs.x = this.x;
        this.bs.gotoAndStop("r1");
        stage.addChild(this.bs);
        stage.update();
        this.step = 1;
        this.update = function(up,down,left,right,space,sdir) {
            /*if(up and this.y>0) {
                
            }*/
            
            this.bs.x = this.x;
            this.bs.y = this.y;
        };
    }
    
    window.enemCount = 0;
    function addEnems(img) {
        //alert("Hi");
        y = Math.floor(Math.random()*canvas.height);
        //console.log(y);
        e = new Enemy(y, img);
        enems.push(e);
        window.enemCount += 1;
        if(enemCount<10) {
            setTimeout(function() {
                addEnems(img);
            },1000);
        }
    }
    window.tick = function() {
        stage.update();
    };
    function imgLoaded(e) {
        //stage.addChild(player.image);
        player.bit = new Bitmap(player.image);
        //player.bit.scaleX = player.bit.scaleY = 0.5;
        player.bit.x = player.x;
        player.bit.y = player.y;
        stage.addChild(player.bit);
        stage.update();
        Ticker.setFPS(12);
        Ticker.addListener(window);
    }
    function init() {
        canvas = $("#c")[0];
        window.stage = new Stage(canvas);
        stage.enableMouseOver(10);
        /*g = new Graphics();
        g.beginFill("silver");
        g.drawRect(0,0,sW,sH);
        window.sword = new Shape(g);
        sword.x = -100;
        sword.y = -100;
        stage.addChild(sword);*/
        pImg = new Image();
        pImg.onload = imgLoaded;
        pImg.onerror = function(e) {
            console.log(e);
        };
        pImg.src = "Graphics/mudkipSprites2.png";
        window.player = new Player(32,32,pImg);
    }
    init();
});
