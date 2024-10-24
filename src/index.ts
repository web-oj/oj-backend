import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import db from "./services/Database";

const PORT = process.env.PORT || 8000;

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

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// db.queryAddDiscussionMessage(3, 3, null, "idk");

db.queryDeleteDiscussionMessage(7);

// db.queryProblemById(1);

// db.queryEditDiscussionMessageAttr(7, null, null, null, "sech");

const f = async () => {
  let t: string = await db.queryFindRootDiscussionMessages();
  console.log(JSON.parse(t));
};

f();
