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

    private getProperty(prop: string): string | undefined{
        return this.configJsonFromFile[prop];
    }

    private getPropIfExists(propKey: string, ifExistsCb: (propValue: string) => any, ifNotExistsCb: Function){
        const propValue = this.getProperty(propKey);
        if(propValue){
            return ifExistsCb(propValue);
        } else {
            return ifNotExistsCb();
        }
    }

    public getWritingLocation(): string {
        const DEFAULT_LOCATION: string = "data.json";
        const writingLocationKey: string = "writingLocation";
        return this.getPropIfExists(writingLocationKey, (propValue: string) => propValue, () => DEFAULT_LOCATION);
    }

    public getWritingTimeout(): number {
        const DEFAULT_TIMEOUT: number = 100
        const writingTimeoutKey = "writingTimeout";
        return this.getPropIfExists(writingTimeoutKey, (propValue: string) => parseInt(propValue), () => DEFAULT_TIMEOUT);
    }

    public getWritingThreshold(): number {
        const DEFAULT_THRESHOLD: number = 100;
        const writingThresholdKey = "writingThreshold";
        return this.getPropIfExists(writingThresholdKey, (propValue: string) => parseInt(propValue), () => DEFAULT_THRESHOLD);
    }

    public static getInstance(): LoggerConfiguration {
        return LoggerConfiguration.INSTANCE;
    }
}
