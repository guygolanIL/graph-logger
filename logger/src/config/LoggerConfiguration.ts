import { existsSync, readFileSync } from "fs";
import * as path from "path";

export class LoggerConfiguration {
    private static CONFIGURATION_FILE_NAME: string = "graph-logger.json";
    private static INSTANCE: LoggerConfiguration = new LoggerConfiguration();
    private configJsonFromFile: any = null;

    private constructor() {
        try {
            let appDir = "";
            if (require.main) {
                appDir = path.dirname(require.main.filename);
            }
            const fileLoc = `${appDir}/${LoggerConfiguration.CONFIGURATION_FILE_NAME}`;
            // must be blocking so app wont start with false properties
            if (existsSync(fileLoc)) {
                const jsonData: any = readFileSync(fileLoc);
                const graphConfig = JSON.parse(jsonData);
                // or graphConfig = require(fileLoc);
                this.configJsonFromFile = graphConfig;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public static getInstance(): LoggerConfiguration {
        return LoggerConfiguration.INSTANCE;
    }
}
