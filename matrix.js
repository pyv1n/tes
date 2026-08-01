const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters =
"0110101011100101101010110100101011100100110100100010110010110101";

const fontSize = 100;
const columns = Math.floor(canvas.width / fontSize);
let speed = 0.2;

const drops = [];
const chars = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
    chars[i] = Math.random() < 0.5 ? "0" : "1";
}

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00eaff";
    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text = chars[i];

        ctx.fillText(
            text,
            i*fontSize,
            drops[i]*fontSize
        );

        if(drops[i]*fontSize > canvas.height && Math.random() > .975){
            drops[i]=0;
        }

        drops[i] += speed;

    }

    requestAnimationFrame(draw);

}

draw();

window.addEventListener("resize",()=>{

    canvas.width = innerWidth;
    canvas.height = innerHeight;

});