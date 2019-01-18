	var cnv = document.getElementById("cnv1");
	var ctx = cnv.getContext('2d');

	var start = false;
	var raf;
	var vv = 5;
	var over = false;


	var ball = {
		x: 150,
		y: 600-5-8, //change
		vx: 0,
		vy: vv,
		r: 8,
		col: "black",
		draw: function() {
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.fillStyle = this.col;
			ctx.fill();
			ctx.restore();
		},
		rset: function() {
			this.x = 150,
			this.y = 600-5-8; //change
		}
	}

	var block = {
		x: 150,
		y: 600,
		h: 5,
		w: 60,
		col: "black",
		draw: function() {
			ctx.save();
			ctx.fillStyle = this.col;
			ctx.fillRect(this.x-this.w/2, this.y-this.h, this.w, this.h);
			ctx.restore();
		},
		rset: function() {
			this.x = 150,
			this.y = 600;
		}
	}

	var line = {
		x1: 150,
		y1: ball.y,
		x2: 0,
		y2: 0,
		length: 80,
		width: 3,
		ang: 0,
		col: "red",
		rot: function(x, y) {
			dx = x-this.x1;
			dy = Math.max(0, this.y1-y);
			this.ang = Math.atan(dy/dx);
			if(this.ang < 0) this.ang += Math.PI;
			this.x2 = 150+this.length*Math.cos(this.ang);
			this.y2 = this.y1-this.length*Math.sin(this.ang);
		},
		draw: function() {
			ctx.save();
			ctx.lineWidth = this.width;
			ctx.strokeStyle = this.col;
			ctx.beginPath();
			ctx.moveTo(this.x1, this.y1);
			ctx.lineTo(this.x2, this.y2);
			ctx.stroke();
			ctx.restore();
		}
	}

	ball.move = function() {
		if(!start) return;
		this.x += this.vx;
		this.y += this.vy;
		if(this.x-this.r < 0) {
			this.x = this.r-this.x;
			this.vx = -this.vx;
		}
		if(this.x+this.r > 300) {
			this.x = 600-(this.x+this.r);
			this.vx = -this.vx;
		}
		if(this.y-this.r < 0) {
			this.y = this.r-this.y;
			this.vy = -this.vy;
		}
		if(this.y+this.r > 600-block.h) {
			if(ball.x-5 > block.x+block.w/2 || ball.x+5 < block.x-block.w/2) {
				over = true;
				return;
			}
			this.y = 2*(600-block.h)-(this.y+this.r);
			this.vy = -this.vy;
		}
	}

	

	function clear() {
		ctx.clearRect(0, 0, 300, 600);
	}
	function rset() {
		clear();
		start = false;
		over = false;
		ball.rset();
		block.rset();

	}

	function drawLayout() {
		ctx.save();
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, 300, 600);
		ctx.restore();
	}

	function move() {
		clear();
		ball.move();
		drawLayout();
		ball.draw();
		block.draw();
		if(over) {
			rset();
			window.cancelAnimationFrame(raf);
			return;
		}
		raf = window.requestAnimationFrame(move);
	}

	clear();
	drawLayout();
	ball.draw();
	block.draw();

	cnv.addEventListener("mousemove", function(e) {
		if(!start) {
			clear();
			drawLayout();
			ball.draw();
			block.draw();
			line.rot(e.clientX, e.clientY);
			line.draw();
		} else {
			block.x = e.clientX;
		}
	});

/*
	cnv.addEventListener("mouseover", function(e) {

	});


	cnv.addEventListener("mouseout", function(e) {

	});
*/
	cnv.addEventListener("click", function(e) {
		if(!start) {
			start = true;
			over = false;
			ball.vx = vv*Math.cos(line.ang);
			ball.vy = vv*Math.sin(line.ang);
			raf = window.requestAnimationFrame(move);
		}
	});