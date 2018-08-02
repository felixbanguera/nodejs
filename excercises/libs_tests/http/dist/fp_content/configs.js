"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const low = require("lowdb/lib/main");
const FileSync = require("lowdb/adapters/FileSync");
class Configs {
    constructor() {
        this.fp_hw = this.readJson('/fp_hw.json');
        this.mix = this.fp_id = this.readJson('/fp_id.json');
        this.mixx();
        this.setDevIdsExist();
    }
    mixx() {
        Object.entries(this.fp_id).forEach(([k, v]) => {
            this.mix[k].extra = this.fp_hw[v.dev_id];
        });
    }
    readJson(URI) {
        return JSON.parse(fs.readFileSync(__dirname + URI, 'utf8'));
    }
    setDevIdsExist() {
        this.dbConnIDs = {};
        Object.entries(this.fp_hw).filter(([key, data]) => {
            return (fs.existsSync(`${__dirname}/devices_status/${key}.json`));
        }).forEach(([key]) => {
            const adapter = new FileSync(`${__dirname}/devices_status/${key}.json`);
            const db = low(adapter);
            this.dbConnIDs[key] = db;
        });
    }
}
exports.Configs = Configs;
