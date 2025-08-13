const temaer = [
  "Nettverksprotokoll",
  "HTTP/HTTPS",
  "FTP",
  "SMTP",
  "DNS",
  "DHCP",
  "SSH",
  "TCP/IP",
  "POP3/IMAP",
  "UDP",
  "ARP",
  "Telnet",
  "SNMP",
  "ICMP",
  "NTP",
  "RIP/OSPF",
  "Feilsøkingskommandoer",
  "Hvordan en datamaskin og telefon er bygd opp",
  "Bits og byte",
  "Hjemmenettverk",
  "Internettets historie",
  "Servere",
  "Skytjenester",
  "Virtualisering",
  "OSI/TCP-IP-modellen",
  "Datadomener",
  "Feilsøking",
  "Digitale trusler",
  "Personvern",
  "HMS i IT",
  "Backup for små bedrifter",
  "VLAN",
  "Bærekraft og IT",
  "Frontend og backend",
  "Kunstig intelligens (KI)",
  "Algoritmer",
  "Teknologi og demokrati",
  "Maskinlæring",
  "Åpen kildekode vs proprietær",
  "Kryptering",
  "Digitale tvillinger",
  "Tilgjengelighet og inkludering",
  "Edge computing",
  "Internet of Things",
  "APIer",
];

let bruktTemaer = [];

const elever = [
  "Tobias",
  "Oskar",
  "Lukas",
  "Andreas",
  "Erik",
  "Lars",
  "Max",
  "Patrik",
  "Alex",
  "William",
  "Damian",
  "Gabriel",
  "Armandas",
  "Sofiia",
  "Sarawut",
];

let currentStudentIndex = 0;
const assignments = {};

function trekkTemaer() {
  const resultatEl = document.getElementById("resultat");
  const meldingEl = document.getElementById("sluttmelding");

  const tilgjengeligeTemaer = temaer.filter((t) => !bruktTemaer.includes(t));

  if (tilgjengeligeTemaer.length < 3) {
    meldingEl.style.display = "block";
    return;
  }

  const valgt = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * tilgjengeligeTemaer.length);
    const tema = tilgjengeligeTemaer[index];
    valgt.push(tema);
    bruktTemaer.push(tema);
    tilgjengeligeTemaer.splice(index, 1);
  }

  resultatEl.innerHTML = valgt.map((t) => `<li>${t}</li>`).join("");
  visTilgjengeligeTemaer();
}

function assignNextStudent() {
  const meldingEl = document.getElementById("sluttmelding");
  const currentStudentEl = document.getElementById("currentStudent");
  const currentTopicsEl = document.getElementById("currentTopics");
  const assignButton = document.getElementById("assignButton");
  const printButton = document.getElementById("printButton");

  if (currentStudentIndex >= elever.length) {
    currentStudentEl.innerHTML = "";
    currentTopicsEl.innerHTML = "";
    assignButton.disabled = true;
    printButton.style.display = "block";
    showFinalList();
    showHelpDialog();
    return;
  }

  const tilgjengeligeTemaer = temaer.filter((t) => !bruktTemaer.includes(t));

  if (tilgjengeligeTemaer.length < 3) {
    alert(
      "Ikke nok temaer til å tildele 3 til hver elev. Trykk F5 for å starte på nytt."
    );
    assignButton.disabled = true;
    return;
  }

  const valgt = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * tilgjengeligeTemaer.length);
    const tema = tilgjengeligeTemaer[index];
    valgt.push(tema);
    bruktTemaer.push(tema);
    tilgjengeligeTemaer.splice(index, 1);
  }

  const elev = elever[currentStudentIndex];
  assignments[elev] = valgt;

  // Display current student and topics with separate spans for label and name
  currentStudentEl.innerHTML = `<h3><span class="label">Elev: </span><span class="name">${elev}</span></h3>`;
  currentTopicsEl.innerHTML = `<ul>${valgt
    .map((t) => `<li>${t}</li>`)
    .join("")}</ul>`;

  currentStudentIndex++;
  visTilgjengeligeTemaer();
}

function showFinalList() {
  const finalListSection = document.getElementById("finalListSection");
  const finalFormattedList = document.getElementById("finalFormattedList");

  // Show the section
  finalListSection.style.display = "block";

  // Generate formatted content
  let formattedContent = "";
  Object.entries(assignments).forEach(([elev, temaer]) => {
    formattedContent += `<h3>${elev}</h3>
    <ul>
      ${temaer.map((tema) => `<li>${tema}</li>`).join("")}
    </ul>`;
  });

  finalFormattedList.innerHTML = formattedContent;

  // Scroll to the final list
  finalListSection.scrollIntoView({ behavior: "smooth" });
}

function showHelpDialog() {
  document.getElementById("helpDialog").style.display = "flex";
}

function closeHelpDialog() {
  document.getElementById("helpDialog").style.display = "none";
}

// Close dialog when clicking outside
document.addEventListener("click", function (event) {
  const dialog = document.getElementById("helpDialog");
  const dialogContent = document.querySelector(".dialog-content");
  if (event.target === dialog) {
    closeHelpDialog();
  }
});

function resetAssignments() {
  const currentStudentEl = document.getElementById("currentStudent");
  const currentTopicsEl = document.getElementById("currentTopics");
  const resultatEl = document.getElementById("resultat");
  const meldingEl = document.getElementById("sluttmelding");
  const assignButton = document.getElementById("assignButton");
  const finalListSection = document.getElementById("finalListSection");
  const printButton = document.getElementById("printButton");

  currentStudentEl.innerHTML = "";
  currentTopicsEl.innerHTML = "";
  resultatEl.innerHTML = "";
  meldingEl.style.display = "none";
  finalListSection.style.display = "none";
  printButton.style.display = "none";

  bruktTemaer = [];
  currentStudentIndex = 0;
  for (const key in assignments) {
    delete assignments[key];
  }
  assignButton.disabled = false;
  closeHelpDialog();
  visTilgjengeligeTemaer(); // Refresh the display to remove strikethrough
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const assignButton = document.getElementById("assignButton");
    if (!assignButton.disabled) {
      assignNextStudent();
    } else {
      resetAssignments();
    }
  }
  if (event.key === "F5") {
    event.preventDefault();
    resetAssignments();
  }
});

function visTilgjengeligeTemaer() {
  const liste = document.getElementById("temaListe");
  liste.innerHTML = "";

  const itemsPerColumn = Math.ceil(temaer.length / 3);
  const kolonne1 = temaer.slice(0, itemsPerColumn);
  const kolonne2 = temaer.slice(itemsPerColumn, itemsPerColumn * 2);
  const kolonne3 = temaer.slice(itemsPerColumn * 2);

  const kolonneHTML = (liste) =>
    "<div>" +
    liste
      .map(
        (t) =>
          `<div class="${
            bruktTemaer.includes(t) ? "strikethrough" : ""
          }">${t}</div>`
      )
      .join("") +
    "</div>";
  liste.innerHTML =
    kolonneHTML(kolonne1) + kolonneHTML(kolonne2) + kolonneHTML(kolonne3);
}

window.onload = visTilgjengeligeTemaer;
