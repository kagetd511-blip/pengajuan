let selectedApp = "";

function toggleSelect(){
    document.querySelector(".custom-select").classList.toggle("active");
}

function selectOption(el){
    let text = el.innerText;
    let img = el.querySelector("img").src;

    selectedApp = text;

    document.getElementById("selectedText").innerHTML =
        `<img src="${img}" class="selected-logo"> ${text}`;

    document.querySelector(".custom-select").classList.remove("active");
}

function kirimWA() {
    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let jumlah = document.getElementById("jumlah").value;
    let tenor = document.getElementById("tenor").value;

    let pesan = `Halo, saya ingin pengajuan pengembalian/pembatalan pinjaman online di:

Aplikasi: ${selectedApp}
Nama: ${nama}
No WA: ${hp}
Total Pinjaman: ${jumlah}
Jangka Waktu: ${tenor}`;

    window.open(`https://wa.me/6283125043684?text=${encodeURIComponent(pesan)}`);
}

/* TUTUP DROPDOWN */
window.onclick = function(e){
    if(!e.target.closest(".custom-select")){
        document.querySelector(".custom-select").classList.remove("active");
    }
}
