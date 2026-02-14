import { db, doc, getDoc, updateDoc } from "../firebase.js";

window.exportBackup = async function(){
  const snap = await getDoc(doc(db,"motoData","main"));
  const data = snap.data();
  const blob = new Blob([JSON.stringify(data)], {type:"application/json"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "backup-moto.json";
  link.click();
}

window.importBackup = async function(){
  const file = document.getElementById("importFile").files[0];
  if (!file) return;

  const text = await file.text();
  const json = JSON.parse(text);

  await updateDoc(doc(db,"motoData","main"), json);

  location.reload();
}
