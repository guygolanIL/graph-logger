"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = __importStar(require("path"));
class LoggerConfiguration {
    constructor() {
        this.configJsonFromFile = null;
        try {
            let appDir = "";
            if (require.main) {
                appDir = path.dirname(require.main.filename);
            }
            const fileLoc = `${appDir}/${LoggerConfiguration.CONFIGURATION_FILE_NAME}`;
            // must be blocking so app wont start with false properties
            if (fs_1.existsSync(fileLoc)) {
                const jsonData = fs_1.readFileSync(fileLoc);
                const graphConfig = JSON.parse(jsonData);
                // or graphConfig = require(fileLoc);
                this.configJsonFromFile = graphConfig;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    static getInstance() {
        return LoggerConfiguration.INSTANCE;
    }
}
LoggerConfiguration.CONFIGURATION_FILE_NAME = "graph-logger.json";
LoggerConfiguration.INSTANCE = new LoggerConfiguration();
exports.LoggerConfiguration = LoggerConfiguration;
//# sourceMappingURL=LoggerConfiguration.js.map