const jsonfile = require('jsonfile');

module.exports = app => {

        app.get("/users", (req, res) => {
            let users;
            jsonfile.readFile('./DB/users.json', (err, data) => {
                res.send(data);
            })
        });
}