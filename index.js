let currentUser;
document.addEventListener('DOMContentLoaded', () => {
    const userHashId = IDGenerator();
    currentUser = new IoClient(userHashId);
    document.getElementById("userId").innerHTML = currentUser.userId;
});

let messageForm = document.getElementById('messageForm');
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    currentUser.sendMessage(userName, message);
});

class IoClient {
    constructor(userId) {
        this.socket = io.connect("http://185.13.90.140:8081", {
            forceNew: true
        });
        this.userId = userId;
        this.socket.on('message', (data) => {
            appendMessage(data);
        })
    }
    sendMessage (userName, message) {
        const messagePayload = {
            user: userName,
            message: message
        };
        if (this.socket) {
            this.socket.emit('message', messagePayload);
        }
    };
}

const IDGenerator = () => {
    return Math.random().toString(36).substr(2, 5).toLocaleUpperCase();
};

const appendMessage = (data) => {
    const message = document.createElement("div");
    let messageText;
    if (data.user === "echoBot2000") {
        messageText = document.createTextNode(`${data.message}`);
        message.classList.add("floatRight");
    } else {
        messageText = document.createTextNode(`${data.user} : ${data.message}`);
        message.classList.add("floatLeft");
    }
    message.appendChild(messageText);
    document.getElementById("messageQueue").appendChild(message);
    message.scrollIntoView();
};