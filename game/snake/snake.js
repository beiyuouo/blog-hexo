var cnv=document.getElementById('cnv1');
var ctx=cnv1.getContext('2d');
var raf;

var BorderColor = "#000000";
var SnakeColor = "#000000";
var BkgdColor = "#FFFFFF";
var AppleColor = "#FF0000"


var width = 600;
var height = 600;
var size = 20;

var score = 0;
var nxtDir = "U"; 
var speedTime = 800;
var minSpeedTime = 100;
var map = [];

var snakeBody = function(x, y, dir) {
	this.x = x;
	this.y = y;
	this.dir = dir;
};

snakeBody.prototype.draw = function() {
	ctx.save();
	ctx.fillStyle = SnakeColor;
	ctx.fillRect(this.x*size-size, this.y*size-size, size, size);
	ctx.restore();
};

var apple = {
	lt: [],
	creatAnApple: function() {
		// console.log(map.length)
		if(this.lt.length!=0) {
			this.lt.shift();
			// console.log(this.lt);
		}
		for(;;) {
			var xx=Math.ceil(Math.random()*(width/size));
			var yy=Math.ceil(Math.random()*(height/size));
			// console.log(xx, yy, map[xx].length)
			if(map[xx][yy] == 0) {
				this.lt.push({x: xx,y: yy});
				break;
			}
		}
	},
	draw: function() {
		ctx.save();
		for(var i=0; i<this.lt.length; i++) {
			ctx.fillStyle = AppleColor;
			ctx.fillRect(this.lt[i].x*size-size, this.lt[i].y*size-size, size, size);
		}
		ctx.restore();
	}
}

var Snake = {
	body: [
		new snakeBody(width/size/2,height/size/2-1,"U"),
		new snakeBody(width/size/2,height/size/2,"U"),
		new snakeBody(width/size/2,height/size/2+1,"U")
	],
	move: function(dir=nxtDir) {
		newx = this.body[0].x;
		newy = this.body[0].y;

		switch(this.body[0].dir) {
			case "U": newy--;break;
			case "D": newy++;break;
			case "L": newx--;break;
			case "R": newx++;break;
		}

		if(newx > width/size) newx-=width/size;
		if(newx <= 0) newx+=width/size;

		if(newy > height/size) newy-=height/size;
		if(newy <= 0) newy+=height/size;
		
		//check apple~!
		hasate=0;
		if(apple.lt.every(function(e) { return e.x==newx && e.y==newy })) hasate=1;
		// console.log(newx, newy, apple.lt.indexOf({x:newx,y:newy}));
		// if(apple.lt.indexOf({x:newx,y:newy})!=-1) hasate=1,console.log("qwq");


		if(!hasate) {
			var tmp=this.body.pop();
			map[tmp.x][tmp.y]=0;
		} else {
			score+=10;
			apple.creatAnApple();
		}

		if(map[newx][newy]==1) {
			fail();
			this.body.unshift(new snakeBody(newx, newy, dir));
			map[newx][newy]=1;
			return 1;
		}
		this.body.unshift(new snakeBody(newx, newy, dir));
		map[newx][newy]=1;

		return 0;
	},
	draw: function() {
		for(var i=0; i<this.body.length; i++) {
			this.body[i].draw();
		}
	}
}


function drawBorder() {
	ctx.save();
	ctx.strokeStyle = BorderColor;
	ctx.strokeRect(0, 0, width, height);
	ctx.restore();
}

function draw() {
	ctx.clearRect(0, 0, width, height);
	drawBorder();
	Snake.draw();
	apple.draw();
	ctx.font = "25px sans-serif"
	ctx.fillText("Score: "+score, width-150, 30, 150);
}

function init() {
	nxtDir = "U"; 
	speedTime = 800;
	score = 0;
	map = [];
	for(var i=0; i<=height/size; i++) {
		map[i]=[];
		for(var j=0; j<=width/size; j++) {
			map[i][j]=0;
		}
	}

	for(var i=0; i<Snake.body.length; i++) {
		map[Snake.body[i].x][Snake.body[i].y]=1;
	}
	apple.creatAnApple();
}

init();

function fail() {
	draw();
	alert("ao! you ate your tail!");

	Snake.body=[
		new snakeBody(width/size/2,height/size/2-1,"U"),
		new snakeBody(width/size/2,height/size/2,"U"),
		new snakeBody(width/size/2,height/size/2+1,"U")
	];
	init();
}

function iFunction() {
	draw();
	Snake.move();
	// speedTime = Math.max(speedTime-0.5, minSpeedTime);
}

setInterval(iFunction, minSpeedTime);

$("body").keydown(function(event) {
	if(event.keyCode==37 && Snake.body[0].dir!="R") {
		nxtDir = "L";
	}
	if(event.keyCode==38 && Snake.body[0].dir!="D") {
		nxtDir = "U";
	}
	if(event.keyCode==39 && Snake.body[0].dir!="L") {
		nxtDir = "R";
	}
	if(event.keyCode==40 && Snake.body[0].dir!="U") {
		nxtDir = "D";
	}
});

