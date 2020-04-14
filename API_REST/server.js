const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("content-type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


//Routes ===========================================================================================

//Search user
app.get("/api", (req, res) => {
    fs.readFile("usuarios.json", "utf-8", (err, data) => {
        if(err) {
            var response = { status: "Falha", resultado: err };
            res.json(response);
        } else {
            var obj = JSON.parse(data);
            var result = "Nenhum usuário foi encontrado";

            obj.usuarios.forEach(function(usuario) {
                if(usuario != null) {
                    if(usuario.usuario_id == req.query.usuario_id) {
                        result = usuario;
                    }
                }
            });

            var response = { status: "Sucesso", resultado: result };
            res.json(response);
        }
    });
});

//Create user
app.post("/api", (req, res) => {
    fs.readFile("usuarios.json", "utf-8", (err, data) => {
        if(err) {
            var response = { status: "falha", resultado: err };
            res.json(response);
        } else {
            var obj = JSON.parse(data);
            req.body.usuario_id = obj.usuarios.length + 1;

            obj.usuarios.push(req.body);

            fs.writeFile("usuarios.json", JSON.stringify(obj), function(err) {
                if(err) {
                    var response = { status: "Falha", resultado: err };
                    res.json(response);
                } else {
                    var response = { status: "Sucesso!", resultado: "Registro inclusso com sucesso" };
                    res.json(response);
                }
            });

        }
    });
});

//Edit user
app.put('/api', (req, res) => {
    fs.readFile("usuarios.json", "utf-8", (err, data) => {
        if(err) {
            var response = { status: "Falha", resultado: err };
            res.json(response);
        } else {
            var obj = JSON.parse(data);

            obj.usuarios[(req.body.usuario_id - 1)].nome = req.body.nome;
            obj.usuarios[(req.body.usuario_id - 1)].site = req.body.site;

            fs.writeFile("usuarios.json", JSON.stringify(obj), function(err) {
                if(err) {
                    var response = { status: "Falha", resultado: err };
                    res.json(response);
                } else {
                    var response = { status: "Sucesso!", resultado: "Registro editado com sucesso!" };
                    res.json(response);
                }
            });
        }
    });
});

//Delete user
app.delete("/api", (req, res) => {
    fs.readFile("usuarios.json", "utf-8", (err, data) => {
        if(err) {
            var response = { status: "Falha", resultado: err };
            res.json(response);
        } else {
            var obj = JSON.parse(data);

            delete obj.usuarios[(req.body.usuario_id - 1)];

            fs.writeFile("usuarios.json", JSON.stringify(obj), function(err) {
                if(err) {
                    var response = { status: "Falha", resultado: err };
                    res.json(response);
                } else {
                    var response = { status: "Sucesso", resultado: "Registro excluido com sucesso" };
                    res.json(response);
                }

            });
        }
    });
});

//========================================================================================================

app.listen(9090, function() { console.log("Server Online!") });