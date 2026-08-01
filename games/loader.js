const loader = document.getElementById("loader");
const fill = document.getElementById("loader-fill");
const percent = document.getElementById("loader-percent");
const status = document.getElementById("loading-status");

let value = 0;

const text = [
    "Loading Assets...",
    "Preparing Game...",
    "Initializing UI...",
    "Access Granted..."
];

const interval = setInterval(() => {

    value++;

    fill.style.width = value + "%";
    percent.textContent = value + "%";

    if(value < 30){
        status.textContent = text[0];
    }else if(value < 60){
        status.textContent = text[1];
    }else if(value < 90){
        status.textContent = text[2];
    }else{
        status.textContent = text[3];
    }

    if(value >= 100){

        clearInterval(interval);

        setTimeout(()=>{

            loader.classList.add("hide");

        },300);

    }

},0,5);