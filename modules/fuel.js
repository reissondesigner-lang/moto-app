import { db, doc, getDoc, updateDoc } from "../firebase.js";

window.registrarAbastecimento = async function() {
  const litros = Number(document.getElementById("litros").value);
  const valor = Number(document.getElementById("valor").value);
  const cheio = document.getElementById("tanqueCheio").checked;

  const docRef = doc(db,"motoData","main");
  const snap = await getDoc(docRef);
  const data = snap.data();

  const kmAtual = data.km.current;

  data.fuel.refuels.push({
    date: new Date().toISOString(),
    litros,
    valor,
    cheio,
    km: kmAtual
  });

  if (cheio) {
    const kmRodado = kmAtual - data.fuel.lastFullRefuelKm;
    const consumo = kmRodado / litros;

    if (!data.fuel.lastThree) data.fuel.lastThree = [];

    data.fuel.lastThree.push(consumo);
    if (data.fuel.lastThree.length > 3)
      data.fuel.lastThree.shift();

    const media =
      data.fuel.lastThree.reduce((a,b)=>a+b,0) /
      data.fuel.lastThree.length;

    data.fuel.averageKmPerLiter = media;
    data.fuel.lastFullRefuelKm = kmAtual;
  }

  await updateDoc(docRef,{ fuel: data.fuel });

  location.reload();
}
