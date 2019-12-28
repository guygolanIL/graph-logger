import { GraphLog } from "./entities/GraphLog";
import { LoggerConfiguration } from "./config/LoggerConfiguration";
import { existsSync, exists, readFile, writeFile } from "fs";
import { execFileSync } from "child_process";

export class Logger {
    private static INSTANCE: Logger = new Logger();

    private static LOG_FILE_NAME: string = "data.json";

    private config: LoggerConfiguration = LoggerConfiguration.getInstance();
    private graphLogs: Array<GraphLog> = [];
    private loggingInterval: NodeJS.Timeout;

    private constructor() {
        console.log("setting logging interval");
        this.loggingInterval = this.setLoggingInterval();
    }

    public static getInstance(): Logger {
        return this.INSTANCE;
    }

    public log(action: GraphLog): void {
        this.graphLogs.push(action);
    }

    public getLogs(): Array<GraphLog> {
        return this.graphLogs;
    }

    private setLoggingInterval() {
        return setInterval(() => {
            if (this.graphLogs.length > this.config.getWritingThreshold()) {
                const saveLocation: string = this.config.getWritingLocation();
                exists(saveLocation, (exists: boolean) => {
                    if (exists) {
                        readFile(saveLocation, (err, data: any) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const jsonData = JSON.parse(data);
                                jsonData.data = [
                                    ...jsonData.data,
                                    ...this.graphLogs
                                ];
                                this.graphLogs = [];
                                writeFile(
                                    saveLocation,
                                    JSON.stringify(jsonData),
                                    () => {
                                        console.log("Writing completed");
                                    }
                                );
                            }
                        });
                    } else {
                        const jsonToSave = {
                            data: [...this.graphLogs]
                        };
                        this.graphLogs = [];
                        writeFile(
                            saveLocation,
                            JSON.stringify(jsonToSave),
                            () => {
                                console.log("Initial writing completed");
                            }
                        );
                    }
                });
            }
        }, this.config.getWritingTimeout());
    }
}
