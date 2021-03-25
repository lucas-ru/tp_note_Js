let id= 0;
let last_id = 0
// import recette from "/interface/recette.ts"
const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs')
const app = express()



//---------------------------------------------ROUTES STATIQUES

app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))
app.use("/images", express.static(__dirname + "/images"))
app.use(bodyParser.urlencoded({ extended: true}))



//--------------------------------------------ROUTE DE FRONT

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html",err => console.log())
})

app.get('/recette',(req,res)=>{
    var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.json(json)
})


app.get('/ViewRecette/:id',(req,res)=>{
    id = req.params.id
    res.sendFile(__dirname + "/views/item.html")
})

app.get('/ShowRecette/:id',(req,res)=>{
    var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    let list = []
    for (let j in json){
        for (var i=0;i < json[j].length;i++) {
            if (json[j][i].id == id)
                list.push(json[j][i])
        }
    }

    res.json(list)
})

app.get("/ViewAdd", (req, res) => {
    res.sendFile(__dirname + "/views/add.html")
})

app.get("/add", (req, res) => {
    // let data = JSON.stringify(req.query)
    let arrayjson = {
        recette: []
    }
    var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));

    for (let j in json){
        for (var i=0;i < json[j].length;i++) {
            if (json[j][i].id > last_id)
            {
                last_id = json[j][i].id
            }
        }
    }

    let ingredient = []
    for (var prep in req.query.preparation) {

       ingredient.push({preparation: req.query.preparation[prep], nom: req.query.Ing_nom[prep], quantite: req.query.quantite[prep]});

    }
    let etapes = []
    for (var eta in req.query.description) {

        etapes.push({nom: req.query.Eta_nom[eta], description: req.query.description[eta]});

    }

    fs.readFile('data.json','utf-8',  ()=> {
        for (let j in json) {
            for (var i = 0; i < json[j].length; i++) {
                arrayjson.recette.push(json[j][i])
                if (i == last_id){
                    arrayjson.recette.push({

                        id: last_id+1,
                        titre:req.query.titre,
                        nombredepersonne: req.query.nombredepersonne,
                        image: req.query.image,
                        tempstotal: req.query.tempstotal,
                        tempsdepréparation: req.query.tempsdepréparation,
                        tempsdecuisson: req.query.tempsdecuisson,
                        tempsderepos: req.query.tempsderepos,
                        difficulte: req.query.difficulte,
                        ingredients:
                        ingredient
                        ,
                        etapes:
                        etapes

                    })
                }
            }
        }
        fs.writeFile("data.json", JSON.stringify(arrayjson), function(err){
            if (err) throw err;
            res.redirect("/")
        });
    })
})

app.get("/delete/:id", (req, res) => {
    let arrayjson = {
        recette: []
    }
    var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    for (let j in json) {
        for (var i = 0; i < json[j].length; i++) {
            if (json[j][i].id != id){
                arrayjson.recette.push(json[j][i])
            }
        }
    }
    fs.writeFile("data.json", JSON.stringify(arrayjson), function(err){
        if (err) throw err;
        res.redirect("/")
    });
})

app.listen(1337)
