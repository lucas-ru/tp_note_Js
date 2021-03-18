
// import recette from "/interface/recette.ts"
const express = require("express")
const fs = require('fs')
const app = express()

//---------------------------------------------ROUTES STATIQUES

app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))


//--------------------------------------------ROUTE DE FRONT

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html")
})

app.get('/recette',(req,res)=>{
    var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    res.json(json)
})

//
//
// app.get<recette>("/recettes",(req,res)=>{
//     console.log(res)
//     res:
//     res.send(res)
// })

app.listen(1337)
