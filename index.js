document.addEventListener('DOMContentLoaded', () => {
    const user = new IoClient("user");
});

class IoClient {
    constructor(username) {
        this.socket = io.connect("http://185.13.90.140:8081", {
            forceNew: true
        });
        this.username = username;
        this.sendMessage = e => {
            const messagePayload = {
                message: e.target.value,
                user: this.username
            };
            if (this.socket) {
                this.socket.emit('sendMessage', messagePayload)
            }
        };
    }
}