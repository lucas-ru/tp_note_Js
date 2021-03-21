let id= 0;
// import recette from "/interface/recette.ts"
const express = require("express")
const fs = require('fs')
const app = express()

//----------VAR
var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));


//---------------------------------------------ROUTES STATIQUES

app.use("/css", express.static(__dirname + "/css"))
app.use("/js", express.static(__dirname + "/js"))
app.use("/images", express.static(__dirname + "/images"))



//--------------------------------------------ROUTE DE FRONT

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html",err => console.log())
})

app.get('/recette',(req,res)=>{
    res.json(json)
})


app.get('/:id',(req,res)=>{
    id = req.params.id
    res.sendFile(__dirname + "/views/item.html")
})

app.get('/recette/:id',(req,res)=>{
    let list = []
    for (let j in json){
        for (var i=0;i < json[j].length;i++) {
            if (json[j][i].id == id)
                list.push(json[j][i])
        }
    }
    res.json(list)
})

app.listen(1337)
