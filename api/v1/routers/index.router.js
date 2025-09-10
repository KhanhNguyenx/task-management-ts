"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_router_1 = require("./task.router");
const user_router_1 = require("./user.router");
const mainV1Router = (app) => {
    const version = "/api/v1";
    app.use(version + "/tasks", task_router_1.taskRouter);
    app.use(`${version}/users`, user_router_1.userRouter);
};
exports.default = mainV1Router;
