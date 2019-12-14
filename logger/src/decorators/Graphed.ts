import {Logger} from '../Logger';

export function Graphed() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const oldFunc = descriptor.value;
        descriptor.value = function() {
            Logger.getInstance().log({
                className: target.constructor.name,
                methodName: propertyKey,
                params: arguments,
                time: process.hrtime()
            });
            oldFunc(...arguments);
        };
    };
}