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

    app.put('/user', (req, res) => {
        let user;
        let email = req.query.email;
        let username = req.body.username;

        jsonfile.readFile(file_path, (err, content)=>{
            for(let i = content.length - 1; i >= 0; i--){
                if(content[i].email === req.query.email){
                    console.log('Updated user ' + email + ' has now username : ' + username )
                    user = content[i];
                    user.username = username;
                }
            }
            jsonfile.writeFile(file_path, content, (err)=>{
                console.log(err);
            })
        });
        res.send(user);

    });
}