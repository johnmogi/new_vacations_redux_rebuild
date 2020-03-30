function getUser(credentials) {
    if(credentials.username === "Moshiko" && credentials.password === "1234") {
        const user = {
            firstName: "Moishe",
            lastName: "Ufnik",
            username: "Moshiko",
            role: "user"
        };
        return user;
    }
    else if(credentials.username === "Kipodi" && credentials.password === "abcd") {
        const user = {
            firstName: "Kipi",
            lastName: "Ben-Kipod",
            username: "Kipodi",
            role: "admin"
        };
        return user;
    }
    return null;
}

module.exports = {
    getUser
};