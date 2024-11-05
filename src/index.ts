import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/config";
import { mysqlDataSource } from "./database/MysqlDataSource";
import { UserService } from "./services/impl/UserService";
import { UserRepository } from "./repositories/UserRepo";
import UserRouter from "./routes/userRouter";
import ContestRouter from "./routes/contestRouter"

const PORT = env.port;

async function main() {
  await mysqlDataSource.initialize();
  await mysqlDataSource.synchronize();

  const app: Application = express();

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.static("public"));
  
  app.get("/ping", async (_req, res) => {
    res.send({
      message: "hello",
    });
  });
  
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    }),
  );

  app.use("/user", UserRouter);
  app.use("/contest", ContestRouter);

  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });  
}

main();