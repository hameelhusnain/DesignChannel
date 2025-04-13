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

let stars = [];
const numStars = 200;

// Star class for 3D moving stars
class Star {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.originalZ = z;
    }

    update() {
        this.z -= 2; // Move the star closer
        if (this.z <= 0) {
            this.z = this.originalZ; // Reset the star's depth
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
        }
    }

    draw() {
        const scale = 300 / this.z; // Perspective scaling
        const x2D = this.x * scale + canvas.width / 2;
        const y2D = this.y * scale + canvas.height / 2;
        const radius = scale * 2;

        ctx.beginPath();
        ctx.arc(x2D, y2D, radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width - canvas.width / 2;
        const y = Math.random() * canvas.height - canvas.height / 2;
        const z = Math.random() * canvas.width;
        stars.push(new Star(x, y, z));
    }
}

function animateStars() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Slightly transparent background for a trailing effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
});

initStars();
animateStars();