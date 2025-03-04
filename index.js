import express from "express";
import configuredb from "./Config/db.js";
import cors from "cors"
import userValidators from "./app/validators/userValidators.js";
import userCltr from "./app/controllers/userControllers.js";
import urlValidator from "./app/validators/urlValidators.js";
import { check, checkSchema } from "express-validator";
import urlCltr from "./app/controllers/urlControllers.js";
import authenticateUser from "./app/middlewares/authenticateUser.js";
import useragent from "express-useragent"
configuredb();
const port = 4004;
const app = express();

app.use(useragent.express())
app.use(cors())
app.use(express.json());
app.set("trust proxy", true);

 
app.post("/api/post", checkSchema(userValidators), userCltr.reg);
app.post("/api/login",userCltr.login);
app.get("/api/getpersons",authenticateUser,userCltr.person)
app.post("/api/url",authenticateUser,checkSchema(urlValidator), urlCltr.posting);
app.get("/api/fetchall",authenticateUser,urlCltr.fetching) 
app.get("/:id",urlCltr.redirectToLongUrl)

app.delete("/api/destroy/:id",urlCltr.destroy)
app.put("/api/destroy/:id",urlCltr.update)
//app.get("/api/short",urlCltr.fetch)

app.listen(port, () => {
    console.log(`${port} is running successfully`);
});
