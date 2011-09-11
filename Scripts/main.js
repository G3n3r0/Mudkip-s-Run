x$(window).on("load", function() {
    window.$ = x$;
    
    if (Touch.isSupported()) { Touch.enable(window.stage); }
    window.bullets = [];
    
    function findIndex(arr,val) {
        for(var i in arr) {
            if(arr[i] == val) {
                return i;
            }
        }
        return false;
    }
    
    spd = [3,3];
    function Bullet(x,y) {
        this.x = x;
        this.y = y;
        g = new Graphics();
        //g.beginFill("blue");
        g.beginLinearGradientFill(["#F00", "#FF0" ,"#0F0", "#0FF" ,"#00F"], [0, 0.25, 0.5, 0.75, 1], 0, 0, 0, 8);
        //g.drawRect(0,0,sW,sH);
        g.drawRect(0,0,8,8);
        t = new Shape(g);
        t.x = this.x+16;
        //t.y = this.y+(this.y/2)+(8/2);
        t.y = this.y;
        /*this.dir = dir;
        if(this.dir=="l") {
            this.spd = -3;
        } else {
            this.spd = 3;
        }*/
        this.spd = 5;
        this.bul = t;
        stage.addChild(this.bul);
        bullets.push(this);
        this.update = function() {
            this.x += this.spd;
            this.bul.x = this.x;
            if(this.x>canvas.width) {
                var ind = findIndex(bullets,this);
                if(ind) {
                    bullets.splice(ind, 1);
                }
            }
        };
    }
    window.bulletTime = 0;
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
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4
        };
        this.sSheet = new SpriteSheet(this.img, 37, 36,this.fdata);
        this.bs = new BitmapSequence(this.sSheet);
        this.bs.y = this.y;
        this.bs.x = this.x;
        this.bs.gotoAndStop("1");
        stage.addChild(this.bs);
        stage.update();
        this.step = 1;
        //console.log(this.fdata, this.fdata.length);
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
            
            if(space && bulletTime<=0) {
                new Bullet(this.x+34,this.y+18);
                bulletTime = 12;
            }
            if(bulletTime>0) {
                bulletTime -= 1;
            }
            //this.bs.gotoAndStop("2");
            this.step += 0.5;
            //console.log(this.step);
            this.bs.gotoAndStop(Math.floor(this.step));
            if(this.step===5) {
                //console.log("Bam");
                this.step = 1;
            }
            
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
        for(var i in bullets) {
            bullets[i].update();
        }
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
        //player.bit.scaleX = player.bit.scaleY = 0.5;
        //stage.addChild(player.image);
        player.bit = new Bitmap(player.image);
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
            //console.log(e);
            throw e;
        };
        if(confirm("OK for Mudkip\nCancel for Nyan Cat")) {
            pImg.src = "./Graphics/mudkipSprites3.png";
        } else {
            pImg.src = "./Graphics/nyan_cat4.png";
        }
        window.player = new Player(32,32,pImg);
    }
    init();
});
