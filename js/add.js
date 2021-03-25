
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#addForm")

    // form.querySelector(".valider").addEventListener("click", () => {
    //     let titre = form.querySelector("input[name=titre]").value
    //     let nombredepersonne = form.querySelector("input[name=nombredepersonne]").value
    //     let image = form.querySelector("input[name=image]").value
    //     let tempstotal = form.querySelector("input[name=tempstotal]").value
    //     let tempsdepréparation = form.querySelector("input[name=tempsdepréparation]").value
    //     let tempsdecuisson = form.querySelector("input[name=tempsdecuisson]").value
    //     let tempsderepos = form.querySelector("input[name=tempsderepos]").value
    //     let difficulte = form.querySelector("input[name=difficulte]").value
    //     let preparation = form.querySelectorAll("input[name=preparation]")
    //     let Ing_nom = form.querySelectorAll("input[name=Ing_nom]")
    //     let quantite = form.querySelectorAll("input[name=quantite]")
    //     let Eta_nom = form.querySelectorAll("input[name=Eta_nom]")
    //     let description = form.querySelectorAll("input[name=description]")
    //
    //     let jsonIng = "etapes"
    //
    //     for (let i = 0; i < Ing_nom.length; i++){
    //
    //     }
    //
    //     fetch("/add?titre=" + titre +
    //         "&nombredepersonne=" + nombredepersonne)
    //         .then((response) => response.json() )
    // })

    form.querySelector(".ing").addEventListener("click",()=>{
        let div = _("div",form.querySelector('.ingredient'),null,null,"item_ing")
        let p1 = _("p",div,null,null,"elementForm")
        let p2 = _("p",div,null,null,"elementForm")
        let p3 = _("p",div,null,null,"elementForm")
        display_input("preparation",p1,"Préparation :")
        display_input("Ing_nom",p2,"Nom :")
        display_input("quantite",p3,"Quantité :")
    })

    form.querySelector(".eta").addEventListener("click",()=>{
        let div = _("div",form.querySelector('.etapes'),null,null,"item_ing")
        let p1 = _("p",div,null,null,"elementForm")
        let p2 = _("p",div,null,null,"elementForm")
        display_input("Eta_nom",p1,"Nom :")
        display_input("description",p2,"Description :")
    })

    function display_input(name,parent,text){
        let input = document.createElement("input")
        let label = document.createElement("label")
        label.innerHTML = text
        input.type = "text"
        input.name = name
        parent.appendChild(label)
        parent.appendChild(input)
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
