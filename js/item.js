
document.addEventListener("DOMContentLoaded", () => {
    let memory = ""
    let section = document.querySelector("section")
    let body = document.querySelector("body")

    fetch("/ShowRecette/:id")
        .then(
            res=>{
                res.json().then(
                    recettes=>{
                        recettes.forEach(item =>{
                            let divParent = _("div",section,null,null,"item_recette")
                            display(item.titre,"div",divParent,"title_item")
                            display_image(item.image,divParent)
                            let divFlex = _("div",divParent,null,null,"flex_info_parent")
                            display("Difficulté: " +item.difficulte,"div",divFlex,"flex_info_children_r")
                            display("Pour " +item.nombredepersonne+" personnes","div",divFlex,"flex_info_children_l")
                            display("Temps de cuisson: "+ item.tempsdecuisson,"div",divParent,"prep")
                            display("Temps de préparation: "+ item.tempsdepréparation,"div",divParent,"prep")
                            if (item.tempsderepos != undefined)
                                display("Temps de repos: "+ item.tempsderepos,"div",divParent,"prep")
                            display("Temps total: "+ item.tempstotal,"div",divParent,"prep")
                            let divIngrédients = _("div",body,null,null,"flex_ingredients_parent")
                            _("div",divIngrédients,"Ingrédients : ",null,"title_ingredients")
                            for (let l in item.ingredients){
                                if (memory == item.ingredients[l].preparation)
                                    mem=true;
                                else
                                    mem = false
                                display_ingredients(item.ingredients[l],"div",divIngrédients,mem)
                                memory = item.ingredients[l].preparation
                            }
                            let divEtapes = _("div",body,null,null,"flex_etapes_parent")
                            _("div",divEtapes,"Préparation : ",null,"title_etapes")
                            for (let e in item.etapes){
                                display_etapes(item.etapes[e],"div",divEtapes)
                            }
                        })
                    }
                )
            }
        )

    function display(stuff,tag,parent,classs=null) {
        if (stuff != undefined)
            _(tag, parent, stuff,null,classs)
        else
            return false;
    }
    function display_etapes(stuff,tag,parent) {
        let OneEtape = _(tag, parent,null,null,"item_OneEtape" )
        _(tag, OneEtape, stuff.nom + ": " ,null,"item_OneEtape_Nom")
        _(tag, OneEtape,  stuff.description ,null,"item_OneEtape_Desc")
    }

    function display_image(url,parent){
        let image = document.createElement("img")
        image.src = url;
        image.classList.add("foodCapture")
        parent.appendChild(image)
    }

    function display_ingredients(stuff,tag,parent,mem) {
        if (stuff.preparation != "" && mem == false)
            _(tag, parent, stuff.preparation + ": ",null,'item_ing_prep')
        _(tag, parent, stuff.quantite + " de " + stuff.nom,null,'item_ing')
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
