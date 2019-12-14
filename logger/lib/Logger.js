"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerConfiguration_1 = require("./config/LoggerConfiguration");
class Logger {
    constructor() {
        this.config = LoggerConfiguration_1.LoggerConfiguration.getInstance();
        this.graphLogs = [];
    }
    static getInstance() {
        return this.INSTANCE;
    }
    log(action) {
        this.graphLogs.push(action);
    }
    getLogs() {
        return this.graphLogs;
    }
}
Logger.INSTANCE = new Logger();
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map