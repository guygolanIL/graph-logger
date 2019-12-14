"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../Logger");
function Graphed() {
    return (target, propertyKey, descriptor) => {
        const oldFunc = descriptor.value;
        descriptor.value = function () {
            Logger_1.Logger.getInstance().log({
                className: target.constructor.name,
                methodName: propertyKey,
                params: arguments,
                time: process.hrtime()
            });
            oldFunc(...arguments);
        };
    };
}
exports.Graphed = Graphed;
//# sourceMappingURL=Graphed.js.map