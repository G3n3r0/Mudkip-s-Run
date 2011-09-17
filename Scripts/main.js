//x$(window).on("load", function() {
window.onload = function() {
    //alert("Derp!");
    window.addEventListener('focus', function() {
        //document.title = 'focused';
        play();
    });
    window.addEventListener('blur', function() {
        //document.title = 'not focused';
        pause();
    });
    //window.$ = x$;
    
    //if (Touch.isSupported()) { Touch.enable(window.stage); }
    window.bullets = [];
    //alert(!!!window.console);
    if(!!!window.console) {
        //alert("Durrp!");
        window.console = {
            log: function(e){alert(e);}
        };
    }
    //console.log("Duh dah. Duh da. Duh da duh da duh da!");
    
    function findIndex(arr,val) {
        for(var i in arr) {
            if(arr[i] == val) {
                return i;
            }
        }
        return false;
    }
    
    //spd = [3,3];
    window.totalKills = 0;
    spd = [1.5,1.5];
    function getGrade(perc) {
        var g;
        /*if(perc>=98) {
            g = "A+";
        } else if(perc<=97 && perc>=94) {
            g = "A";
        } else if(perc<=93 && perc>=90) {
            g = "A-";
        } else if(perc<=89 && perc>=85) {
            g = "B+";
        } else if(perc<=84 && perc>=80) {
            g = "B";
        } else if(perc<=79 && perc>=75) {
            g = "B-";
        } else if(perc<=74 && perc>=70) {
            g = "C+";
        } else if(perc<=69 && perc>=65) {
            g = "C";
        } else if(perc<=64 && perc>=60) {
            g = "C-";
        } else if(perc<=59 && perc>=50) {
            g = "D";
        } else if(perc<=49 && perc>=0) {
            g = "F";
        }*/
        /*if(perc<=100 && perc>=90) {
            g = "A";
        } else if(perc<=89 && perc>=75) {
            g = "B";
        } else if(perc<=74 && perc>=60) {
            g = "C";
        } else if(perc<=59 && perc>=50) {
            g = "D";
        } else if(perc<=49 && perc>=0) {
            g = "F";
        }*/
        /*64;
        73;
        82;
        91;
        100;*/
        console.log(perc);
        if(perc>=98) {
            g = "A";
        } else if(perc>=91) {
            g = "B";
        } else if(perc>=82) {
            g = "C";
        } else if(perc>=73) {
            g = "D";
        } else if(perc>=0) {
            g = "F";
        }
        return g;
    }
    //console.log(getGrade(78));
    function resetLevel() {
        for(var i in stage.children) {
            stage.removeChild(stage.children[i]);
        }
        enems = [];
        bullets = [];
        window.totalKills = 0;
        window.killCount = 0;
        window.enemCount = 0;
        u = false;
        d = false;
        l = false;
        r = false;
        s = false;
        delete player;
        clearTimeout(window.enemTimeout);
        //running = true;
        //init();
    }
    function pause() {
        running = false;
    }
    function play() {
        running = true;
    }
    function lose() {
        Ticker.setPaused(true);
        var perc = (window.totalKills/window.enemCount)*100;
        var lett = getGrade(perc);
        //running = false;
        pause();
        //alert(lett);
        resetLevel();
        //console.log(u,d,l,r,s);
        urls = {
            A: "http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=25727955",
            B: "http://pull.imgfave.netdna-cdn.com/image_cache/1312249185739669.jpg",
            C: "http://chzmemebase.files.wordpress.com/2011/04/memes-thats-why-their-navy-sucks.jpg",
            D: "http://images.memegenerator.net/instances/320x/10036413.jpg",
            F: "http://chzmemebase.files.wordpress.com/2011/01/memes-you-drop-f-bomb-in-school.jpg"
        };
        console.log(lett);
        url = urls[lett];
        image = new Image();
        image.onload = function(e) {
            //console.log(image.width,image.height);
            bit = new Bitmap(image);
            sw = canvas.width/image.width;
            sh = canvas.height/image.height;
            //console.log(sw,image.width,image.width/canvas.width);
            bit.scaleX = sw;
            bit.scaleY = sh;
            bit.mouseEnabled = true;
            bit.x = this.x;
            bit.y = this.y;
            //console.log(canvas.onclick);
            canvas.onclick = function(e) {
                //alert("Durr!!!");
                f = g||confirm("Continue?");
                //console.log("a",f,!!f);
                if(f) {
                    stage.removeChild(bit);
                    canvas.onclick = null;
                    //resetLevel();
                    running = true;
                    Ticker.setPaused(false);
                    init();
                    //running = true;
                } else {
                    running = false;
                }
            };
            stage.addChild(bit);
            stage.update();
        };
        image.src = url;
        stgs = {
            A: "I no am disappoint son. You make proud.",
            B: "You brush with Oral-B? Son I am disappoint.",
            C: "You want sail the seven C's? No! You sail seven A's!",
            D: "You get D? Now, I D-isown you!",
            F: "[sob]Son, you make big disappoint. You leave now."
        };
        //stg = "You no "+lett+"sian. You Asian!\nContinue?";
        stg = stgs[lett]+"\nContinue?";
        /*f = confirm(stg);
        //console.log("a",f,!!f);
        if(f) {
            //resetLevel();
            running = true;
            Ticker.setPaused(false);
            //init();
            //running = true;
        } else {
            running = false;
        }*/
        //console.log(running,window.running);
    }
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
            for(var i in enems) {
                en = enems[i];
                var a = {
                    x: this.x,
                    y: this.y,
                    width: 8,
                    height: 8
                };
                var b = {
                    x: en.x,
                    y: en.y,
                    width: 21,
                    height: 28
                };
                //if(E(this.x,en.x,this.y,en.y,8,21,8,28)) {
                if(E(a,b)) {
                    console.log("Enemy Hit");
                    this.x = canvas.width+10;
                    enems.splice(i, 1);
                    stage.removeChild(en.bs);
                    window.killCount += 1;
                    window.totalKills += 1;
                    //console.log(killCount);
                }
            }
        };
    }
    window.enemCount = 0;
    window.enems = [];
    function addEnems(img) {
        //console.log(img);
        //alert("Hi");
        y = Math.floor(Math.random()*(canvas.height-28));
        //console.log(y);
        e = new Enemy(y, img);
        enems.push(e);
        window.enemCount += 1;
        //if(enemCount<10) {
            window.enemTimeout = setTimeout(function() {
                addEnems(img);
            },3000);
        //}
    }
    /*function E(X,x,Y,y,W,w,H,h) { // check collision
        S = X - x;
        D = Y - y;
        F = W + w;
        G = H + h;
        return (S * S + D * D <= F * G);
    }*/
    function E(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }
    function Enemy(y, image) {
        //console.log(this);
        //this.x = 100;
        this.x = canvas.width;
        this.y = y;
        //console.log(y);
        this.image = image;
        /*this.bit = new Bitmap(image);
        this.bit.x = this.x;
        this.bit.y = this.y;
        stage.addChild(this.bit);*/
        this.fdata = {
            1: 0,
            2: 1,
            3: 2,
            4: 3
        };
        this.sSheet = new SpriteSheet(this.image, 21, 28,this.fdata);
        this.bs = new BitmapSequence(this.sSheet);
        this.bs.y = this.y;
        this.bs.x = this.x;
        this.bs.gotoAndStop("1");
        stage.addChild(this.bs);
        this.step = 1;
        this.update = function() {
            /*if(this.x>0) {
                this.x -= 3;
            } else {
                lose();
            }*/
            this.step += 0.25;
            //console.log(this.step);
            this.bs.gotoAndStop(Math.floor(this.step));
            if(this.step===4) {
                //console.log("Bam");
                this.step = 1;
            }
            if(this.x>0) {
                //this.x -= 1.5;
                this.x -= spd[0]+1;
            } else {
                stage.removeChild(this.bs);
                //enems.remove(this);
                var ind = findIndex(enems,this);
                if(ind) {
                    enems.splice(ind, 1);
                }
            }
            //console.log(this.x,this.y,this.step);
            this.bs.x = this.x;
            this.bs.y = this.y;
            //console.log(this.x,sword.x,sword.x+sW);
            //if(this.x>=sword.x && this.x<=sword.x+sW) 
            //console.log(swordCol(this));
            /*if(swordCol(this)) {
                //alert(1);
                stage.removeChild(this.bit);
                //enems.remove(this);
                var ind = findIndex(enems,this);
                if(ind) {
                    enems.splice(ind, 1);
                }
            }*/
            //if(E(this.x,player.x,this.y,player.y,21,37,28,36)) {
            var a = {
                x: this.x,
                y: this.y,
                width: 21,
                height: 28
            };
            var b = {
                x: player.x,
                y: player.y,
                width: 37,
                height: 36
            };
            if(E(a,b)) {
                lose();
                console.log("Player Hit");
                window.running = false;
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
            this.step += 0.25;
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
    /*function addEnems(img) {
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
    }*/
    window.killCount = 0;
    window.neededKills = 10;
    function enemLoaded(e) {
        addEnems(this);
    }
    window.running = true;
    window.tick = function() {
        //console.log(running);
        if(running) {
            if(player) {
                player.update(u,d,l,r,s,sd);
            }
            for(var i in bullets) {
                bullets[i].update();
            }
            //console.log(enems.length);
            if(enems.length>0) {
                for(var j in enems) {
                    enems[j].update();
                }
            }
            if(killCount>=neededKills) {
                neededKills *= 2;
                killCount = 0;
            }
            stage.removeChild(sco);
            //console.log(neededKills,killCount);
            window.sco = new Text(neededKills-killCount, "18px Arial", "#FFF");
            sco.x = canvas.width-sco.getMeasuredWidth()-10;
            sco.y = sco.getMeasuredLineHeight();
            stage.addChild(sco);
        } else {
            console.log("No run.");
        }
        stage.update();
    };
    var u,d,l,r,s = false;
    var sd = "r";
    //$("*").on("keydown", function(e) {
    document.onkeydown = function(e) {
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
    //});
    };
    //$("*").on("keyup", function(e) {
    document.onkeyup = function(e) {
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
    //});
    };
    function imgLoaded(e) {
        //console.log("So I herd u like Mudkips.");
        //console.log(window.player);
        //player.bit.scaleX = player.bit.scaleY = 0.5;
        //stage.addChild(player.image);
        player.bit = new Bitmap(player.image);
        player.bit.x = player.x;
        player.bit.y = player.y;
        stage.addChild(player.bit);
        stage.update();
        Ticker.setFPS(24);
        Ticker.addListener(window);
    }
    canvas = document.getElementById("c");
    window.stage = new Stage(canvas);
    stage.enableMouseOver(10);
    function init(g) {
        //alert("Laheim!");
        //canvas = $("#c")[0];
        /*canvas = document.getElementById("c");
        window.stage = new Stage(canvas);
        stage.enableMouseOver(10);*/
        /*g = new Graphics();
        g.beginFill("silver");
        g.drawRect(0,0,50,50);
        window.sword = new Shape(g);
        sword.x = 100;
        sword.y = 100;
        stage.addChild(sword);*/
        pImg = new Image();
        pImg.onload = imgLoaded;
        pImg.onerror = function(e,a) {
            //console.log(e);
            //throw e;
            console.log(e,a);
        };
        if(confirm("OK for Mudkip\nCancel for Nyan Cat")) {
            pImg.src = "./Graphics/mudkipSprites3.png";
            //pImg.src = "./Graphics/enemSprite1.png";
        } else {
            pImg.src = "./Graphics/nyan_cat4.png";
        }
        window.player = new Player(32,32,pImg);
        console.log(player);
        eImg = new Image();
        eImg.onload = enemLoaded;
        eImg.src = "./Graphics/enemSprite1.png";
        
        window.sco = new Text(neededKills-killCount, "18px Arial", "#FFF");
        sco.x = canvas.width-sco.getMeasuredWidth()-10;
        sco.y = sco.getMeasuredLineHeight();
        stage.addChild(sco);
    }
    function charSelect(imgURL) {
        var fdata = {
            1: 0,
            2:1
        };
        var image = new Image();
        image.onload = function(e) {
            var sSheet = new SpriteSheet(image, 123, 128,fdata);
            var bs = new BitmapSequence(sSheet);
            mk.y = this.y;
            mk.x = this.x;
            mk.gotoAndStop("1");
            stage.addChild(mk);
        };
    }
    function titleScreen(imgURL) {
        image = new Image();
        image.onload = function(e) {
            //console.log(image.width,image.height);
            var bit = new Bitmap(image);
            bit.scaleX = bit.scaleY = 0.5;
            bit.x = bit.y = 0;
            bit.mouseEnabled = true;
            bit.onClick = function(e) {
                stage.removeChild(this);
                init();
                //stage.update();
            };
            stage.addChild(bit);
            stage.update();
        };
        image.src = imgURL;
    }
    //alert("Durr!");
    //init();
    //pause();
    titleScreen("Graphics/mudkipTitleScreen.png");
//});
};
