const express = require("express");
const usersLogic = require("../database/users-logic");
const router = express.Router();


// GET http://localhost:3001/api/users
router.get("/users", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;