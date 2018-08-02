"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Observable_1 = require("rxjs/Observable");
const io = require("socket.io-client");
class SocketComunication {
    constructor() {
        this.site = "local_socket_server";
        this.config = JSON.parse(fs.readFileSync(__dirname + '/socket_config.json', 'utf8'))[this.site];
        this.socket = this.create_io();
        console.log(`SocketComunication:config: ${JSON.stringify(this.config)}`);
    }
    create_io() {
        const url = `http://${this.config.ip}:${this.config.port}`;
        console.info(`yyyyyyyyy The url for socket: ${url}`);
        return io(url);
    }
    onConnect() {
        return new Observable_1.Observable(observer => {
            this.socket.on('connect', () => observer.next());
        });
    }
    onDisconnect() {
        return new Observable_1.Observable(observer => {
            this.socket.on('disconnect', () => observer.next());
        });
    }
    send(event, data) {
        this.socket.emit(event, data);
    }
    onEvent(event) {
        return new Observable_1.Observable(observer => {
            this.socket.on(event, (data) => {
                observer.next(data);
            });
        });
    }
}
exports.SocketComunication = SocketComunication;
