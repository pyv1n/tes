// ===============================
// POPUP ANGGOTA
// ===============================

const popup = document.getElementById("popup");

const popupImg = document.getElementById("popup-img");
const popupNama = document.getElementById("popup-nama");
const popupContact = document.getElementById("popup-contact");
const popupDeskripsi = document.getElementById("popup-deskripsi");

const rajinBar = document.getElementById("rajin-bar");
const tidurBar = document.getElementById("tidur-bar");
const yappingBar = document.getElementById("yapping-bar");


// ===============================
// TYPEWRITER
// ===============================

function typeWriter(element, text, speed = 50) {

    element.textContent = "";

    let index = 0;

    function type() {

        if (index < text.length) {

            element.textContent += text.charAt(index);

            index++;

            setTimeout(type, speed);

        }

    }

    type();

}


// ===============================
// OPEN POPUP
// ===============================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", () => {

        popupImg.src = card.dataset.img;

        popupImg.alt = card.dataset.nama;

        typeWriter(
            popupNama,
            card.dataset.nama,
            60
        );

        popupContact.textContent = card.dataset.contact;

        popupDeskripsi.textContent = card.dataset.deskripsi;

        rajinBar.style.width = "0%";
        tidurBar.style.width = "0%";
        yappingBar.style.width = "0%";

        popup.classList.add("show");

        requestAnimationFrame(() => {

            rajinBar.style.width =
                card.dataset.rajin + "%";

            tidurBar.style.width =
                card.dataset.tidur + "%";

            yappingBar.style.width =
                card.dataset.yapping + "%";

        });

    });

});


// ===============================
// CLOSE POPUP
// ===============================

function closePopup() {

    popup.classList.remove("show");

    rajinBar.style.width = "0%";
    tidurBar.style.width = "0%";
    yappingBar.style.width = "0%";

}


document.querySelector(".close")
.addEventListener("click", closePopup);


popup.addEventListener("click", (e) => {

    if (e.target === popup) {

        closePopup();

    }

});


document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" &&
        popup.classList.contains("show")) {

        closePopup();

    }

});



