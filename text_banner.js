const track = document.querySelector(".marquee-track");
const group = document.querySelector(".marquee-group");

if (track && group) {

    let offset = 0;
    let speed = 1;
    let targetSpeed = 1;

    function animate() {

        speed += (targetSpeed - speed) * 0.08;

        offset += speed;

        const width = group.offsetWidth;

        if (offset >= width) {
            offset = 0;
        }

        if (offset < 0) {
            offset = width;
        }

        track.style.transform = `translateX(${-offset}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    let lastScroll = window.scrollY;
    let timer;

    window.addEventListener("scroll", () => {

        targetSpeed = window.scrollY < lastScroll ? -1 : 1;

        lastScroll = window.scrollY;

        clearTimeout(timer);

        timer = setTimeout(() => {
            targetSpeed = 1;
        }, 200);

    });

}