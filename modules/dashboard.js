import { db, doc, getDoc } from "../firebase.js";

(async function(){
  const snap = await getDoc(doc(db,"motoData","main"));
  const data = snap.data();

  const media = data.fuel.averageKmPerLiter || 0;

  if (media > 0) {
    const litrosConsumidos =
      (data.km.current - data.fuel.lastFullRefuelKm) / media;

    const litrosRestantes =
      data.fuel.tankCapacity - litrosConsumidos;

    const autonomia =
      litrosRestantes * media;

    document.getElementById("tanque").innerText =
      litrosRestantes.toFixed(2)+" L";

    document.getElementById("autonomia").innerText =
      autonomia.toFixed(0)+" km";
  }
})();
