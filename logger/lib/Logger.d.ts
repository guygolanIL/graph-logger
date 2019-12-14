import { GraphLog } from "./entities/GraphLog";
export declare class Logger {
    private static INSTANCE;
    private config;
    private graphLogs;
    private constructor();
    static getInstance(): Logger;
    log(action: GraphLog): void;
    getLogs(): Array<GraphLog>;
}
