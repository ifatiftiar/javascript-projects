const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// particles array
const particlesArr = [];

// particle contructor
class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = Math.random() * 20 - 10;
        this.speedY = Math.random() * 20 - 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > innerWidth || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size * 2 > innerHeight || this.y - this.size < 0) {
            this.speedY *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.draw();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * (innerWidth - 2 * size) - size * 2;
        const y = Math.random() * (innerHeight - 2 * size) - size * 2;
        const color = `rgb(${Math.floor(x % 255)}, ${Math.floor(
            y % 255
        )}, ${size})`;
        particlesArr.push(new Particle(x, y, size, color));
    }
}
init();

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    particlesArr.forEach((particle) => {
        particle.draw();
        particle.update();
    });
}
animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
