
let stream = null;
let countdown = null;

function submitAttendance(){
  const result = document.getElementById("scanResult");
  if(result){
    result.innerHTML = "✅ QR berhasil diproses. Kehadiran tercatat untuk Pemrograman Web Lanjut.";
    setTimeout(()=>{ location.href = "mahasiswa-konfirmasi.html"; }, 900);
  }
}

async function startScanner(){
  const box = document.getElementById("cameraBox");
  const video = document.getElementById("scannerVideo");
  const result = document.getElementById("scanResult");
  try{
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }});
    video.srcObject = stream;
    video.hidden = false;
    box.innerHTML = "";
    box.appendChild(video);
    result.innerHTML = "📷 Kamera aktif. Arahkan ke QR Code dosen. Demo ini akan otomatis berhasil dalam 3 detik.";
    setTimeout(submitAttendance, 3000);
  }catch(e){
    result.innerHTML = "⚠️ Kamera tidak dapat diakses. Gunakan input kode manual.";
  }
}

function stopScanner(){
  if(stream){ stream.getTracks().forEach(t => t.stop()); }
  location.reload();
}

function generateQR(){
  const text = document.getElementById("qrCodeText");
  const timer = document.getElementById("qrTimer");
  const fake = document.getElementById("qrFake");
  const code = "QR-" + Math.random().toString(36).substring(2,8).toUpperCase();
  if(text) text.innerText = code;
  if(fake) fake.innerText = code.slice(-2);
  let seconds = Number(document.getElementById("qrDuration")?.value || 300);
  clearInterval(countdown);
  countdown = setInterval(()=>{
    const m = String(Math.floor(seconds/60)).padStart(2,"0");
    const s = String(seconds%60).padStart(2,"0");
    if(timer) timer.innerText = `${m}:${s}`;
    seconds--;
    if(seconds < 0){ clearInterval(countdown); if(timer) timer.innerText = "EXPIRED"; }
  },1000);
}
