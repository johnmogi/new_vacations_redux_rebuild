const express = require("express");
const expressSession = require("express-session");
const cors = require("cors");
const server = express();
const authController = require("./controllers/users-controller");
const vacsController = require("./controllers/vacation-controller");

server.use("/api", vacsController);
server.use("/api/auth", authController);

// --**remove** 
const logic = require("./logic");
server.use(cors({ origin: "http://localhost:3000", credentials: true })); // Need those exact configuration for the session cookie to be saved at client side.
server.use(express.json());
server.use(expressSession({ name: "TestLoginCookie", secret: "KittensAreCute", resave: true, saveUninitialized: false }));
server.post("/api/auth/login", (request, response) => {
    try {
        const credentials = request.body;
        const user = logic.getUser(credentials);
        if (!user) {
            response.status(401).send("Incorrect username or password");
            return;
        }
        request.session.isLoggedIn = true;
        request.session.role = user.role;
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
server.post("/api/auth/logout", (request, response) => {
    request.session.destroy();
    response.send();
});
server.get("/api/home", (request, response) => { // Anonymous Users
    try {
        response.json({ value: "Some Home Data" });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
server.get("/api/products", (request, response) => { // Registered Users
    try {
        if (!request.session.isLoggedIn) {
            response.status(401).send("You are not logged in");
            return;
        }
        response.json({ value: "Some Products Data" });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
server.get("/api/admin", (request, response) => { // Admin Users
    try {
        if (!request.session.isLoggedIn) {
            response.status(401).send("You are not logged in");
            return;
        }
        if (request.session.role !== "admin") {
            response.status(403).send("You are not admin");
            return;
        }
        response.json({ value: "Some Admin Data" });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
// --**remove**

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
