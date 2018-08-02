"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs_js_1 = require("./configs.js");
class PersistDevice {
    constructor() {
        this.conf = new configs_js_1.Configs();
    }
    // get device all  status from file
    getDevAllStatus(dev_id) {
        let statusData = {};
        if (Object.entries(this.conf.dbConnIDs).some(([devId, configData]) => devId === dev_id)) {
            statusData = this.conf.dbConnIDs[dev_id] && this.conf.dbConnIDs[dev_id].getState();
        }
        else {
            console.log(`getDevAllStatus:: file for device id ${dev_id} don't exist `);
        }
        return statusData;
    }
    save_new_state(dev_id, newData) {
        this.conf.dbConnIDs[dev_id] && this.conf.dbConnIDs[dev_id].setState(newData).write();
    }
}
exports.PersistDevice = PersistDevice;
