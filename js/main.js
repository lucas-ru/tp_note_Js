
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#addForm")


    fetch("/recette")
        .then(
            res=>{
                res.json().then(
                    recettes=>{
                        console.log(typeof(recettes));
                        const keys = Object.entries(recettes)
                        console.log("key "+keys)
                        for (let j in recettes){
                            console.log(recettes[j])
                            for (var i=0;i < recettes[j].length;i++){
                                let divParent = _("div",document.querySelector("section"),null,null,"item_recette")
                                console.log(recettes[j][i].titre)
                                display(recettes[j][i].titre,"div",divParent)
                                display(recettes[j][i].difficulte,"div",divParent)
                                display(recettes[j][i].nombredepersonne,"div",divParent)
                                display(recettes[j][i].tempsdecuisson,"div",divParent)
                                display(recettes[j][i].tempsdepréparation,"div",divParent)
                                display(recettes[j][i].tempsderepos,"div",divParent)
                                display(recettes[j][i].tempstotal,"div",divParent)
                                console.log(typeof(recettes[j][i].etapes));
                                for (let l in recettes[j][i].ingredients){
                                    display_ingredients(recettes[j][i].ingredients[l],"div",divParent)
                                }
                                for (let e in recettes[j][i].etapes){
                                    console.log(recettes[j][i].etapes[e].description)
                                    // for (let l in recettes[j][i].etapes[e]){
                                    //     console.log(recettes[j][i].etapes[e][l])
                                    // }
                                    display_etapes(recettes[j][i].etapes[e],"div",divParent)
                                }
                            }
                        }
                    }
                )
            }
        )

    function display(stuff,tag,parent) {
        console.log(parent,tag)
        if (stuff != undefined)
            _(tag, parent, stuff)
        else
            return false;
    }

    function display_etapes(stuff,tag,parent) {
        _(tag, parent, stuff.nom + ": " + stuff.description + ")")
    }

    function display_ingredients(stuff,tag,parent) {
        if (stuff.preparation != "")
            _(tag, parent, stuff.preparation + stuff.quantite + " de " + stuff.nom + ")")
        else
            _(tag, parent, stuff.quantite + " de " + stuff.nom + ")")

    }

})

function _(tag, parent, text=null,  id=null, classs=null) {

    let element = document.createElement(tag)
    if (text)
        element.appendChild(document.createTextNode(text))
    parent.appendChild(element)
    if (id)
        element.id = id
    if (classs)
        element.classList.add(classs)
    return element

}
