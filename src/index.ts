import 'module-alias/register';
import './setupModuleAlias';
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { env } from "./config/config";
import { mysqlDataSource } from "./database/MysqlDataSource";
import { RegisterRoutes } from "./routes/routes";

// import UserRouter from "./routes/userRouter";

export default async function initApp() {
  await mysqlDataSource.initialize();
  await mysqlDataSource.synchronize();

  const app = express();

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.static("public"));
  app.use(cors());
  
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

  RegisterRoutes(app);

  return app;
}

if (require.main === module) {
  const PORT = env.port;
  initApp().then((app) => {
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  });
}