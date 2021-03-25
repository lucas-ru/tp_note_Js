
document.addEventListener("DOMContentLoaded", () => {

    fetch("/recette")
        .then(
            res=>{
                res.json().then(
                    recettes=>{
                        for (let j in recettes){
                            for (var i=0;i < recettes[j].length;i++){
                                console.log(recettes[j][i])
                                let divParent = _("div",document.querySelector("section"),null,null,"item_recette")
                                display(recettes[j][i].titre,"div",divParent,"title_item")
                                display_image(recettes[j][i].image,divParent)
                                let divFlex = _("div",divParent,null,null,"flex_info_parent")
                                display("Difficulté: " +recettes[j][i].difficulte,"div",divFlex,"flex_info_children_r")
                                display("Pour " +recettes[j][i].nombredepersonne+" personnes","div",divFlex,"flex_info_children_l")
                                display_link(recettes[j][i].id,divParent)

                            }
                        }
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

    function display_link(url,parent){
        let link = document.createElement("a")
        link.href = "/ViewRecette/"+url;
        link.text = "voir la recette"
        link.classList.add("link_recette")
        parent.appendChild(link)
    }

    function display_etapes(stuff,tag,parent) {
        _(tag, parent, stuff.nom + ": " + stuff.description + ")")
    }

    function display_image(url,parent){
        let image = document.createElement("img")
        image.src = url;
        image.classList.add("foodCapture")
        parent.appendChild(image)
    }

    function display_ingredients(stuff,tag,parent) {
        if (stuff.preparation != "")
            _(tag, parent, stuff.preparation + ": " + stuff.quantite + " de " + stuff.nom + ")")
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
