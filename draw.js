(() => {
    window.onload = () => {
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            width = canvas.width;
            height = canvas.height;
        }

        const canvas = document.getElementById('bg');
        const context = canvas.getContext('2d');

        const radius = 100;
        const accel = 10;

        let width = null;
        let height = null;

        resize();

        let dotMax = 150;
        let dots = new Array(dotMax).fill(0).map(() => {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                dx: -1 + Math.random() * 2,
                dy: -1 + Math.random() * 2,
                size: 2 + Math.random() * 3
            };
        });

        const main = () => {
            resize();
            context.clearRect(0, 0, width, height);

            dots.map(dot => {
                context.beginPath();
                context.fillStyle = '#dadada';
                context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                context.closePath();
                context.fill();

                let speed = (dot.size / accel);
                dot.x += dot.dx * speed;
                dot.y += dot.dy * speed;

                if (dot.x < 0 || dot.x > width || dot.y < 0 || dot.y > height) {
                    dot.dx *= -1;
                    dot.dy *= -1;
                }
            });

            dots.map((dot, i) => {
                let x = dot.x;
                let y = dot.y;

                dots.map((otherDot, j) => {
                    let xx = otherDot.x;
                    let yy = otherDot.y;

                    if ((x - xx) ** 2 + (y - yy) ** 2 < radius ** 2) {
                        context.beginPath();
                        context.lineWidth = 1;
                        context.strokeStyle = '#dadada';
                        context.moveTo(x, y);
                        context.lineTo(xx, yy);
                        context.closePath();
                        context.stroke();
                    }
                });
            });

            requestAnimationFrame(main);
        }

        interpreter();
        main();
    }
})();