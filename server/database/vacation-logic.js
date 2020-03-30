const dal = require("./connection");
async function getAllVacsAsync() {
    const sql = `SELECT vacationID, vacationName,description, destination, picFileName, DATE_FORMAT(startDate, "%m/%d/%Y") as startDate, DATE_FORMAT(endDate, "%m/%d/%Y") as endDate, price FROM vacations`;
    const vacs = await dal.executeAsync(sql);
    return vacs;
}
module.exports = {
    getAllVacsAsync
}