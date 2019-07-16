(function() {

	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	let w = canvas.width = innerWidth;
	let h = canvas.height = innerHeight;

	let particles = [];
	let properties = {
		bgColor: 'rgba(17,17,19,1)',
		particleColor: 'rgb(30,125,125)',
		particleRadius: 3,
		particleCount: 60,
		particleVelocity: 0.5,
		// particleLifetime: 6,
		lineLength: 250
	};

	window.onresize = function () {
		w = canvas.width = innerWidth;
		h = canvas.height = innerHeight;
	};

	class Particle {
		constructor() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.velocityX = Math.random() * (properties.particleVelocity * 2) - properties.particleVelocity;
			this.velocityY = Math.random() * (properties.particleVelocity * 2) - properties.particleVelocity;
			// this.lifetime =  Math.random() * properties.particleLifetime * 60;
		}
		updatePosition() {
			if (this.x + this.velocityX > w && this.velocityX > 0 ||
				this.x + this.velocityX < 0 && this.velocityX < 0) {

				this.velocityX *= -1
			}

			if (this.y + this.velocityY > h && this.velocityY > 0 ||
				this.y + this.velocityY < 0 && this.velocityY < 0) {

				this.velocityY *= -1
			}

			this.x += this.velocityX;
			this.y += this.velocityY;
		}
		redraw() {
			context.beginPath();
			context.arc(this.x, this.y, properties.particleRadius,0,Math.PI * 2);

			context.fillStyle = properties.particleColor;
			context.fill();
		}
		/*
		recalculateLifetime() {
			if (this.lifetime < 1) {
				this.setValues();
			}

			this.lifetime--;
		}
		*/
	}

	function redrawBackground() {
		context.fillStyle = properties.bgColor;
		context.fillRect(0, 0, w, h);
	}
	function drawLines() {
		let x1, x2, y1, y2, length, opacity;

		for (let i = 0; i < particles.length; i++) {
			for (let j = 0; j < particles.length; j++) {
				x1 = particles[i].x;
				y1 = particles[i].y;

				x2 = particles[j].x;
				y2 = particles[j].y;

				length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

				if (length < properties.lineLength) {
					opacity = 1 - length / properties.lineLength;

					context.lineWidth = .5;
					context.strokeStyle = `rgba(30, 125, 125, ${opacity})`;

					context.beginPath();
					context.moveTo(x1, y1);
					context.lineTo(x2, y2);
					context.closePath();
					context.stroke();
				}
			}
		}
	}
	function redrawParticles() {
		for (let i in particles) {
			particles[i].updatePosition();
			// particles[i].recalculateLifetime();
			particles[i].redraw();
		}
	}
	function loop() {
		redrawBackground();
		drawLines();
		redrawParticles();
		requestAnimationFrame(loop);
	}
	function init() {
		for (let i = 0; i < properties.particleCount; i++) {
			particles.push(new Particle);
		}

		loop();
	}

	init();

})();
