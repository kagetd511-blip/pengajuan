function kirimWA() {
    let app = document.getElementById("app").value;
    let nama = document.getElementById("nama").value;
    let hp = document.getElementById("hp").value;
    let jumlah = document.getElementById("jumlah").value;
    let tenor = document.getElementById("tenor").value;

    let pesan = `Halo, saya ingin pengajuan:

Aplikasi: ${app}
Nama: ${nama}
No WA: ${hp}
Total Pinjaman: ${jumlah}
Jangka Waktu: ${tenor}`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`);
}
