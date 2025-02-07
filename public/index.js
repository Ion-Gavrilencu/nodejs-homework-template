const notify = document.querySelector("#notification");
const message = document.querySelector("#message");
const button = document.querySelector("button");
const messageBar = document.querySelector("#message-bar");
const form = document.querySelector("#messageBox");

// eslint-disable-next-line
const socket = io("http://localhost:3000");

function sendMessage(e) {
  e.preventDefault();
  socket.emit("chat-message", message.value);

  form?.reset();
}

button.addEventListener("click", sendMessage);

socket.on("chat-message-received", (data) => {
  notify.textContent = data;
  messageBar.style.height = "20vh";
});

socket.on("contact-added", (data) => {
  console.dir(data);
  notify.textContent = `Contactul ${data.name} a fost adaugat`;
});