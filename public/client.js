const socket = io();
const textarea = document.getElementById("textarea");
const form = document.getElementById("form");
const sendBtn = document.getElementById("sendBtn");

let user;
do {
  user = prompt("Please enter your name");
} while (!user);

sendBtn.addEventListener("click", () => {
  const message = textarea.value.trim();
  if (message !== "") {
    sendMessage(message);
  }
});

function sendMessage(msg) {
  let message = {
    user: user,
    message: msg.trim(),
  };
  appendMessage(message, "outgoing");
  socket.emit("message", message);
  textarea.value = "";
}

function appendMessage(message, type) {
  let mainDiv = document.createElement("div");

  if (type === "outgoing") {
    mainDiv.className =
      "outgoing bg-purple-100 text-right rounded-lg p-4 mb-4 w-3/4 ml-auto";
    mainDiv.innerHTML = `
      <h1 class="text-lg font-semibold text-purple-800">${message.user}</h1>
      <p class="text-gray-700">${message.message}</p>
    `;
  } else {
    mainDiv.className =
      "incoming bg-blue-100 text-left rounded-lg p-4 mb-4 w-3/4";
    mainDiv.innerHTML = `
      <h1 class="text-lg font-semibold text-blue-800">${message.user}</h1>
      <p class="text-gray-700">${message.message}</p>
    `;
  }

  form.appendChild(mainDiv);
  form.scrollTop = form.scrollHeight;
}

socket.on("message", (message) => {
  appendMessage(message, "incoming");
});
