const express = require("express");
const vacsLogic = require("../database/vacation-logic");
const router = express.Router();

// GET http://localhost:3000/api/vacations
// if user isn't logged in- deny the service
router.get("/vacations", async (request, response) => {
    try {
        // if (!request.session.isLoggedIn) {
        //   response.status(403).send("Access Denied! Please Log-In!");
        //   return;
        // }
        const vacs = await vacsLogic.getAllVacsAsync();
        response.json(vacs);
    } catch (err) {
        response.status(500).send(err.message);
    }
});
module.exports = router;