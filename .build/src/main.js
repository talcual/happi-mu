"use strict";
exports.server = (event, context, cb) => {
    let jsonResponse = { "hello": "world" };
    const response = {
        statusCode: 200,
        body: JSON.stringify(jsonResponse),
    };
    cb(response);
};
//# sourceMappingURL=main.js.map