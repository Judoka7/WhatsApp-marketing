let contacts = [];
let currentIndex = 0;

document.getElementById("fileInput").addEventListener("change", handleFile);
document.getElementById("startBtn").addEventListener("click", startCampaign);
document.getElementById("nextBtn").addEventListener("click", openNext);

function handleFile(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const lines = event.target.result.split("\n");
    contacts = lines
      .map(line => line.split(","))
      .filter(row => row.length >= 2)
      .map(row => ({
        nom: row[0].trim(),
        tel: row[1].trim()
      }));
  };

  reader.readAsText(file);
}

function startCampaign() {
  if (contacts.length === 0) {
    alert("Importe un fichier CSV valide.");
    return;
  }

  currentIndex = 0;
  document.getElementById("campaign").classList.remove("hidden");
  updateCounter();
}

function openNext() {
  if (currentIndex >= contacts.length) {
    alert("Campagne terminée 🎉");
    return;
  }

  const msgTemplate = document.getElementById("message").value;
  const contact = contacts[currentIndex];

  const finalMessage = msgTemplate.replace(/{{nom}}/g, contact.nom);
  const encodedMessage = encodeURIComponent(finalMessage);

  const url = `https://wa.me/${contact.tel}?text=${encodedMessage}`;
  window.open(url, "_blank");

  currentIndex++;
  updateCounter();
}

function updateCounter() {
  document.getElementById("counter").innerText =
    `Contact ${currentIndex + 1} / ${contacts.length}`;
}
