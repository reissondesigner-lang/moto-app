import { db, doc, getDoc, updateDoc } from "../firebase.js";

const backendUrl = "https://moto-backend.vercel.app/api/km";

async function atualizarKm() {
  const docRef = doc(db, "motoData", "main");
  const snap = await getDoc(docRef);
  const data = snap.data();

  try {
    const response = await fetch(backendUrl);
    const apiData = await response.json();

    if (!apiData.error) {
      const apiLast = apiData.km;

      const kmTotal =
        data.km.manualBase +
        (apiLast - data.km.apiBase);

      await updateDoc(docRef, {
        "km.apiLast": apiLast,
        "km.current": kmTotal
      });

      registrarHistorico(kmTotal, data);

      document.getElementById("kmAtual").innerText = kmTotal.toFixed(0);
      return;
    }
  } catch {}

  document.getElementById("kmAtual").innerText = data.km.current;
}

async function registrarHistorico(kmTotal, data) {
  const hoje = new Date().toISOString().split("T")[0];

  const existe = data.km.historyDaily.find(d => d.date === hoje);

  if (!existe) {
    data.km.historyDaily.push({ date: hoje, km: kmTotal });

    if (data.km.historyDaily.length > 120)
      data.km.historyDaily.shift();

    await updateDoc(doc(db,"motoData","main"),{
      "km.historyDaily": data.km.historyDaily
    });
  }
}

window.manualKmUpdate = async function() {
  const novoKm = prompt("Novo KM Atual:");
  if (!novoKm) return;

  if (!confirm("Confirmar atualização manual?")) return;

  const docRef = doc(db, "motoData", "main");
  const snap = await getDoc(docRef);
  const data = snap.data();

  await updateDoc(docRef,{
    "km.manualBase": Number(novoKm),
    "km.apiBase": data.km.apiLast,
    "km.current": Number(novoKm)
  });

  location.reload();
}

window.onload = atualizarKm;
