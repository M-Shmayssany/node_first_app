const jsonfile = require('jsonfile');
const file_path = './DB/users.json';

module.exports = app => {

    app.get("/users", (req, res) => {
        console.log('Fetching all users');

        //jsonfile reading
        jsonfile.readFile(file_path, (err, content) => {

            // sending file contents back to sender
            res.send(content);
        })
    });


    app.post("/users/new", (req, res) => {
        let email = req.body.email;
        let username = req.body.username;

        jsonfile.readFile(file_path, (err, content)=>{
            content.push({ email: email, username: username });

            console.log("Added " + email + " to DB");

            jsonfile.writeFile(file_path, content, (err)=>{
                console.log(err);
            });
            res.sendStatus(200);
        });
    });

    app.delete("/users/destroy", (req, res)=>{
        let email = req.body.email;
        jsonfile.readFile(file_path, (err, content)=>{
            
            for (let i = content.length - 1; i >= 0; i--){
                
                if(content[i].email === email){
                    console.log("Removing " + content[i].email + " from DB");
                    content.pop(i);
                }
            }
            jsonfile.writeFile(file_path, content,(err)=>{
                console.log(err);
            });
            res.sendStatus(200);
        });
    });
}