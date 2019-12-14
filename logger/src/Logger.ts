import { GraphLog } from "./entities/GraphLog";
import { LoggerConfiguration } from "./config/LoggerConfiguration";

export class Logger {
    private static INSTANCE: Logger = new Logger();

    private config: LoggerConfiguration = LoggerConfiguration.getInstance();
    private graphLogs: Array<GraphLog> = [];

    private constructor(){}

    public static getInstance(): Logger {
        return this.INSTANCE;
    }

    public log(action: GraphLog): void {
        this.graphLogs.push(action);
    }

    public getLogs(): Array<GraphLog> {
        return this.graphLogs;
    }
}