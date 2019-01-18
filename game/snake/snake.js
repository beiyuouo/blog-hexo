var cnv=document.getElementById('cnv1');
var ctx=cnv1.getContext('2d');

BorderColor = "#000000";
SnakeColor = "#000000";
BkgdColor = "#FFFFFF";


width = 600;
height = 600;
size = 20;



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


var Snake = {
	body: [
		new snakeBody(width/size/2,height/size/2-1,"U"),
		new snakeBody(width/size/2,height/size/2,"U"),
		new snakeBody(width/size/2,height/size/2+1,"U")
	],
	move: function() {
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
	drawBorder();
	Snake.draw();
}


function init() {
	draw();
}

function main() {
	init();
}

main();