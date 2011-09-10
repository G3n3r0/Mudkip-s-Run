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
            r1: 0,
            r2: 1,
            r3: 2,
            r4: 3,
            r5: 4
        };
        this.sSheet = new SpriteSheet(this.img, 37, 36,this.fdata);
        this.bs = new BitmapSequence(this.sSheet);
        this.bs.y = this.y;
        this.bs.x = this.x;
        this.bs.gotoAndStop("r1");
        stage.addChild(this.bs);
        stage.update();
        this.step = 1;
        this.update = function(up,down,left,right,space) {
            if(up && this.y>0) {
                this.y -= this.spd[1];
            }
            if(down && this.y<canvas.height-36) {
                this.y += this.spd[1];
            }
            if(left && this.x>0) {
                this.x -= this.spd[0];
            }
            if(right && this.x<canvas.width-37) {
                this.x += this.spd[0];
            }
            this.bs.gotoAndStop("r2");
            
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
        player.update(u,d,l,r,s,sd);
        stage.update();
    };
    var u,d,l,r,s = false;
    var sd = "r";
    $("*").on("keydown", function(e) {
        //e.preventDefault();
        //e.stopPropagation();
        //console.log(e);
        if(e.which===38) {
            e.preventDefault();
            e.stopPropagation();
            u = true;
        } else if(e.which===40) {
            e.preventDefault();
            e.stopPropagation();
            d = true;
        } else if(e.which===37) {
            e.preventDefault();
            e.stopPropagation();
            l = true;
            sd = "l";
        } else if(e.which===39) {
            e.preventDefault();
            e.stopPropagation();
            r = true;
            sd = "r";
        } else if(e.which===32) {
            e.preventDefault();
            e.stopPropagation();
            s = true;
        }
    });
    $("*").on("keyup", function(e) {
        //console.log(e);
        if(e.which===38) {
            e.preventDefault();
            e.stopPropagation();
            u = false;
        } else if(e.which===40) {
            e.preventDefault();
            e.stopPropagation();
            d = false;
        } else if(e.which===37) {
            e.preventDefault();
            e.stopPropagation();
            l = false;
        } else if(e.which===39) {
            e.preventDefault();
            e.stopPropagation();
            r = false;
        } else if(e.which===32) {
            e.preventDefault();
            e.stopPropagation();
            s = false;
        }
    });
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
        pImg.src = "./Graphics/mudkipSprites3.png";
        window.player = new Player(32,32,pImg);
    }
    init();
});
