let selectedApp = "";

/* =========================
   DROPDOWN
========================= */
function toggleSelect(){
    document.querySelector(".custom-select").classList.toggle("active");
}

function selectOption(el){
    let text = el.innerText;
    let img = el.querySelector("img")?.src || "";

    selectedApp = text;

    let selectedHTML = img 
        ? `<img src="${img}" class="selected-logo"> ${text}`
        : text;

    document.getElementById("selectedText").innerHTML = selectedHTML;

    document.querySelector(".custom-select").classList.remove("active");
    clearSelectError();
}

function showCustomInput(e){
    e.stopPropagation();
    document.getElementById("customInputBox").style.display = "flex";
}

function setCustomApp(){
    let val = document.getElementById("customApp").value;

    if(val.trim() !== ""){
        selectedApp = val;
        document.getElementById("selectedText").innerText = val;

        document.getElementById("customInputBox").style.display = "none";
        document.querySelector(".custom-select").classList.remove("active");
        clearSelectError();
    }
}

/* =========================
   TUTUP DROPDOWN
========================= */
document.addEventListener("click", function(e){
    if(!e.target.closest(".custom-select")){
        document.querySelector(".custom-select").classList.remove("active");
    }
});

/* =========================
   VALIDASI FORM
========================= */
function validateForm(){
    let nama = document.getElementById("nama");
    let hp = document.getElementById("hp");
    let jumlah = document.getElementById("jumlah");
    let tenor = document.getElementById("tenor");

    let valid = true;

    let fields = [nama, hp, jumlah, tenor];

    fields.forEach(f => {
        f.parentElement.classList.remove("error");

        if(f.value.trim() === ""){
            f.parentElement.classList.add("error");
            valid = false;
        }
    });

    if(selectedApp === ""){
        document.querySelector(".select-box").classList.add("error");
        valid = false;
    } else {
        document.querySelector(".select-box").classList.remove("error");
    }

    if(!valid){
        showAlert("Lengkapi Form!");
    }

    return valid;
}

/* =========================
   KIRIM WA
========================= */
function kirimWA(){

    if(!validateForm()) return;

    let data = {
        app: selectedApp,
        nama: document.getElementById("nama").value,
        hp: document.getElementById("hp").value,
        jumlah: document.getElementById("jumlah").value,
        tenor: document.getElementById("tenor").value
    };

    // simpan ke localStorage
    localStorage.setItem("dataSurat", JSON.stringify(data));

    // pindah halaman
    window.location.href = "surat.html";
}

/* =========================
   FORMAT NOMOR WA
========================= */
document.getElementById("hp").addEventListener("input", function(){
    let val = this.value.replace(/\D/g, "");

    let format = "";

    if(val.length > 0) format += val.substring(0,4);
    if(val.length >= 5) format += "-" + val.substring(4,8);
    if(val.length >= 9) format += "-" + val.substring(8,12);

    this.value = format;
});

/* =========================
   FORMAT RUPIAH
========================= */
document.getElementById("jumlah").addEventListener("input", function(){
    let angka = this.value.replace(/\D/g, "");

    if(angka === ""){
        this.value = "";
        return;
    }

    this.value = "Rp " + formatRupiah(angka);

    // hapus error kalau sudah ada isi
    this.parentElement.classList.remove("error");
});

function formatRupiah(angka){
    return angka.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* =========================
   ANGKA ONLY (TENOR)
========================= */
function onlyNumber(id){
    document.getElementById(id).addEventListener("input", function(){
        this.value = this.value.replace(/\D/g, "");
    });
}

onlyNumber("tenor");

/* =========================
   HAPUS ERROR SAAT DIISI
========================= */
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", function(){

        if(this.id === "jumlah"){
            let angka = this.value.replace(/\D/g, "");
            if(angka !== ""){
                this.parentElement.classList.remove("error");
            }
        } else {
            if(this.value.trim() !== ""){
                this.parentElement.classList.remove("error");
            }
        }

    });
});

/* =========================
   CLEAR ERROR DROPDOWN
========================= */
function clearSelectError(){
    document.querySelector(".select-box").classList.remove("error");
}

/* =========================
   ALERT KEREN
========================= */
function showAlert(msg){
    let box = document.createElement("div");
    box.className = "custom-alert";
    box.innerText = msg;

    document.body.appendChild(box);

    setTimeout(()=>{
        box.classList.add("show");
    },100);

    setTimeout(()=>{
        box.classList.remove("show");
        setTimeout(()=> box.remove(), 300);
    },2000);
}
