import { taskRouter } from "./task.router";
import { userRouter } from "./user.router";
import { Express } from "express";
import * as authMiddleware from '../middlewares/auth.middleware';

const mainV1Router = (app: Express) :void=> {
  const version = "/api/v1";

  app.use(version + "/tasks",/* authMiddleware.authMiddleware,*/ taskRouter);

  app.use(`${version}/users`, userRouter);
}

export default mainV1Router;