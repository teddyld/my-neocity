const serverUrl = "http://localhost:5050";

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
    await fetch(`${serverUrl}/`, {
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

/* Update visit counts */
const counterVisits = document.querySelector("#counter-visits");
const counterUnique = document.querySelector("#counter-unique");
const counterOnsite = document.querySelector("#counter-onsite");

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const MAX_DELAY = 300;
const MIN_DELAY = 100;
const MAX_NUMBERS = 6;

const counterLoadingAnimation = (counter) => {
  const randomDelay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
  const id = setInterval(() => {
    let randomCount = "";
    for (let j = 0; j < MAX_NUMBERS; j++) {
      randomCount += numbers[Math.floor(Math.random() * numbers.length)];
    }
    counter.innerText = randomCount;
  }, randomDelay);
  return id;
};

const counterVisitsId = counterLoadingAnimation(counterVisits);
const counterUniqueId = counterLoadingAnimation(counterUnique);
const counterOnsiteId = counterLoadingAnimation(counterOnsite);

const updateVisits = async () => {
  try {
    const response = await fetch(`${serverUrl}/visits/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        user: localStorage.getItem("user"),
      }),
    });

    window.clearInterval(counterVisitsId);
    window.clearInterval(counterUniqueId);
    window.clearInterval(counterOnsiteId);

    const { user, visits, unique, online } = await response.json();
    counterVisits.innerText = visits;
    counterUnique.innerText = unique;
    counterOnsite.innerText = online;
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", user);
    }
  } catch (err) {
    addStatusFailed(serverStatus);
  }
};

// Poll count of visitors
const POLL_INTERVAL = 600000; // 10 minutes
const pollVisits = () => {
  setInterval(() => {
    updateVisits();
  }, POLL_INTERVAL);
};

updateVisits();
pollVisits();

// Heartbeat to maintain user's online status
const setUserOnline = async () => {
  if (!localStorage.getItem("user")) {
    return;
  }

  await fetch(`${serverUrl}/visits/online`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user: localStorage.getItem("user"),
    }),
  });
};

const HEARTBEAT_INTERVAL = 3600000; // 1 hour
setInterval(() => {
  setUserOnline();
}, HEARTBEAT_INTERVAL);
