import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from 'path';


import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";
import agentRouter from "./routes/agent.routes.js";
dotenv.config();
const PORT= process.env.PORT || 8080
const app = express();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// app.get("/", (req, res) => {
//     res.send({ message: "Hey There Developer ,Server is Successfully Running!" });
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/agents", agentRouter);

app.use("/api/v1/properties", propertyRouter);

app.use(express.static(path.join(__dirname,'/client/build')));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname,'/client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});
const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URI);

        app.listen(8080, () =>
            console.log(`Server started on port ${PORT}`),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
