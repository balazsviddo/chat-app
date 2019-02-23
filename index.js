const SOCKET_URL = "http://185.13.90.140:8081";
let currentUser;

document.addEventListener("DOMContentLoaded", () => {
    currentUser = new IoClient();
});

let messageForm = document.getElementById("messageForm");
messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = document.getElementById("username").value;
    const message = document.getElementById("message").value;
    const formErrors = document.getElementById("formErrors");
    const errorMessage = validateForm(userName, message);
    if (!errorMessage) {
        currentUser.sendMessage(userName, message);
        formErrors.style.display = "none";
        formErrors.innerText = "";
    } else {
        formErrors.style.display = "initial";
        formErrors.innerText = errorMessage;
    }
});

class IoClient {
    constructor() {
        this.socket = io.connect(SOCKET_URL, {
            forceNew: true
        });
        this.socket.on("message", (data) => {
            appendMessage(data);
        })
    }
    sendMessage (userName, message) {
        const messagePayload = {
            user: userName,
            message: message
        };
        if (this.socket) {
            this.socket.emit("message", messagePayload);
        }
    };
}

const appendMessage = (data) => {
    const message = document.createElement("div");
    message.classList.add("chatMessage");
    let messageText;
    if (data.user === "echoBot2000") {
        const onlyMessage = data.message.match(/content: (.*)/)[1];
        messageText = document.createTextNode(`${onlyMessage}`);
        message.classList.add("floatRight");
    } else {
        messageText = document.createTextNode(`${data.user} : ${data.message}`);
        message.classList.add("floatLeft");
    }
    message.appendChild(messageText);
    document.getElementById("messageQueue").appendChild(message);
    message.scrollIntoView();
};

const validateForm = (userName, message) => {
  if (userName && message) return null;
  if (!userName) return "Please enter a username to send message";
  if (!message) return "Unable to send empty messages";
};