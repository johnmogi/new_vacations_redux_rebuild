const dal = require("./connection");


async function getAllUsersAsync() {
    const sql = "SELECT * FROM users";
    const users = await dal.executeAsync(sql);
    return users;
}

module.exports = {
    getAllUsersAsync
}