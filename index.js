document.addEventListener("DOMContentLoaded", () => {
    const revealerNav = window.revealer({
        revealElementSelector: ".nav-js",
        options: {
            anchorSelector: ".nav-btn-js",
        },
    });

    const actionBtn = document.querySelector(".nav-btn-js");
    actionBtn.addEventListener("click", () => {
        if (!revealerNav.isRevealed()) {
            revealerNav.reveal();
            actionBtn.setAttribute("data-open", true);
        } else {
            revealerNav.hide();
            actionBtn.setAttribute("data-open", false);
        }
    });
});

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];
let stars = [];
let ripples = [];
const maxStars = 100;

// Circle class for expanding circles
class Circle {
    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.radius += this.speed;
        if (this.radius > canvas.width / 2) {
            this.radius = Math.random() * 50;
        }
        this.draw();
    }
}

// Star class for shining stars
class Star {
    constructor(x, y, radius, opacity, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.opacity = opacity;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.opacity += this.speed;
        if (this.opacity <= 0 || this.opacity >= 1) {
            this.speed *= -1;
        }
        this.draw();
    }
}

// Ripple class for water-like effect
class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.radius += 2;
        this.opacity -= 0.02;
        if (this.opacity <= 0) {
            const index = ripples.indexOf(this);
            if (index > -1) ripples.splice(index, 1);
        }
        this.draw();
    }
}

function init() {
    // Initialize circles
    for (let i = 0; i < 20; i++) {
        const radius = Math.random() * 50;
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const speed = Math.random() * 0.5 + 0.2;
        const color = 'rgba(255, 255, 255, 0.5)';
        circles.push(new Circle(x, y, radius, speed, color));
    }

    // Initialize stars
    for (let i = 0; i < maxStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        const opacity = Math.random();
        const speed = Math.random() * 0.02 - 0.01;
        stars.push(new Star(x, y, radius, opacity, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw circles
    circles.forEach(circle => circle.update());

    // Update and draw stars
    stars.forEach(star => star.update());

    // Update and draw ripples
    ripples.forEach(ripple => ripple.update());

    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circles = [];
    stars = [];
    init();
});

init();
animate();