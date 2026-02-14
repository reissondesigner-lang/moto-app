import { db, doc, getDoc } from "../firebase.js";

(async function(){
  const snap = await getDoc(doc(db,"motoData","main"));
  const data = snap.data();

  if (data.fuel.currentLiters < 1) {
    alert("⚠ Tanque baixo!");
  }
})();
