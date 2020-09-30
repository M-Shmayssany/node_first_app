const jsonfile = require('jsonfile');


module.exports = app => {

    app.get("/users", (req, res) => {
        console.log('Fetching all users');

        //jsonfile reading
        jsonfile.readFile('./DB/users.json', (err, content) => {

            // sending file contents back to sender
            res.send(content);
        })
    });

    
    app.post("/users/new", (req, res) => {
        let email = req.body.email;
        let username = req.body.username;

        jsonfile.readFile("./DB/users.json", (err, content)=>{
            content.push({ email: email, username: username });

            console.log("Added " + email + " to DB");

            jsonfile.writeFile("./DB/users.json", content, (err)=>{
                console.log(err);
            });
            res.sendStatus(200);
        });
    });
}