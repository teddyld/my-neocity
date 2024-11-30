// Change window title on blur
const documentTitle = document.querySelector("title");

const handleWindowFocus = () => {
  documentTitle.innerText = "ʕ´•ᴥ•`ʔ teddyld";
};
const handleWindowBlur = () => {
  documentTitle.innerText = "⍝ʕ´•ᴥ•`ʔ⍝ teddyld";
};

window.addEventListener("blur", handleWindowBlur);
window.addEventListener("focus", handleWindowFocus);

const cleanupEventListeners = () => {
  window.removeEventListener("blur", handleWindowBlur);
  window.removeEventListener("focus", handleWindowFocus);
};

if (window.closed) {
  cleanupEventListeners();
}

// Change webpage when the unknown button is pressed three times
const unknownBtn = document.querySelector("#unknown-btn");
const noiseOverlay = document.querySelector("#noise-overlay");
const cloudOverlay = document.querySelector("#cloud-overlay");
const nameHeader = document.querySelector("#name-header");
let nUnknown = 0;

const hideUnknown = () => {
  unknownBtn.style.display = "none";
  noiseOverlay.style.display = "none";
  cloudOverlay.style.display = "block";
  nameHeader.classList.remove("glitch");
};

const handleUnknown = () => {
  // Remove button
  if (nUnknown === 3) {
    hideUnknown();
  } else {
  }
  nUnknown += 1;
};

unknownBtn.addEventListener("click", handleUnknown);

const addStatusSuccess = (element) => {
  element.classList.add("status-success");
  element.innerText = "OK";
};

const addStatusFailed = (element) => {
  element.classList.add("status-failed");
  element.innerText = "FAILED";
};

const serverStatus = document.querySelector("#server-status");
const checkServerStatus = async () => {
  try {
    await fetch("http://localhost:5050", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    addStatusSuccess(serverStatus);
  } catch (err) {
    addStatusFailed(serverStatus);
  }
};

checkServerStatus();

// Display count of visitors
const updateVisitors = async (cookie) => {
  console.log("cookie", cookie);
};

updateVisitors(document.cookie);
