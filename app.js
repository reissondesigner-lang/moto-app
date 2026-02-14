import { db, doc, getDoc, updateDoc } from "./firebase.js";

const backendUrl = "https://moto-backend.vercel.app/api/km";

async function atualizarKm() {
  try {
    const response = await fetch(backendUrl);
    const data = await response.json();

    const docRef = doc(db, "motoData", "main");
    const snapshot = await getDoc(docRef);
    const dbData = snapshot.data();

    const apiLast = data.km;

    const kmTotal =
      dbData.km.manualBase +
      (apiLast - dbData.km.apiBase);

    await updateDoc(docRef, {
      "km.apiLast": apiLast,
      "km.current": kmTotal
    });

    document.getElementById("kmAtual").innerText = kmTotal.toFixed(0);

  } catch (err) {
    console.log("Falha API, usando último valor");
  }
}

window.onload = atualizarKm;
