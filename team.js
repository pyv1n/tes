const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

resize();
window.addEventListener("resize", resize);


let nodes = [];

const count = 60;


function createNodes(){

    nodes = [];

    for(let i = 0; i < count; i++){

        nodes.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,

            vx:(Math.random()-.5)*0.3,
            vy:(Math.random()-.5)*0.3,

            size:Math.random()*2+1
        });

    }
}

createNodes();



function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // garis koneksi
    nodes.forEach((a)=>{

        nodes.forEach((b)=>{

            let dx = a.x-b.x;
            let dy = a.y-b.y;

            let distance = Math.sqrt(
                dx*dx + dy*dy
            );


            if(distance < 130){

                ctx.beginPath();

                ctx.strokeStyle =
                `rgba(0,220,255,
                ${1-distance/130})`;

                ctx.lineWidth=.6;

                ctx.moveTo(a.x,a.y);
                ctx.lineTo(b.x,b.y);

                ctx.stroke();

            }

        });


        // node
        ctx.beginPath();

        ctx.fillStyle="#00eaff";

        ctx.shadowBlur=15;
        ctx.shadowColor="#00eaff";

        ctx.arc(
            a.x,
            a.y,
            a.size,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.shadowBlur=0;


        // gerakan
        a.x += a.vx;
        a.y += a.vy;


        if(a.x<0 || a.x>canvas.width)
            a.vx*=-1;

        if(a.y<0 || a.y>canvas.height)
            a.vy*=-1;

    });


    requestAnimationFrame(draw);

}


draw();