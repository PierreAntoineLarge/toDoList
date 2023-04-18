/**
 * 
 * @param {{title:string, body:string}} item 
 * @return {HTMLElement}
 */
function createItem(item){
    const lister = document.createElement('li')

    lister.classList.add("todo")
    lister.classList.add("list-group-item")
    lister.classList.add("d-flex")
    lister.classList.add("align-item-center")
    
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add("form-check-input")
    input.addEventListener('change', function() {
        const done = this.checked; // Récupérer l'état de la case à cocher
        lister.setAttribute('data-done', done); // Mettre à jour l'attribut de données
        // Ajouter ou retirer la classe "done" pour marquer l'élément comme fait ou non fait
        if (done) {
            lister.classList.add('done');
        } else {
            lister.classList.remove('done');
        }
    });
    lister.append(input)

    const label = document.createElement('label')
    label.innerText = item.title
    label.classList.add("ms-2")
    label.classList.add("form-check-label")
    const id = item.id
    label.htmlFor = "todo-"+id;
    lister.append(label)

    const trash = document.createElement('button')
    trash.classList.add("ms-auto") 
    trash.classList.add("btn") 
    trash.classList.add("btn-danger") 
    trash.classList.add("btn-sm") 
    trash.addEventListener("click", deleteItem)
    lister.append(trash)

    const poubelle = document.createElement('i')
    poubelle.classList.add("bi-trash")
    trash.append(poubelle)
    return lister
}

function deleteItem(event){
    const toDelete = event.currentTarget.parentElement
    toDelete.remove()
}

function addItem(text){
    const place = document.querySelector('ul')
    const lastItem = place.lastChild
    console.log(lastItem)
    const newItem = document.createElement('li')

    newItem.classList.add("todo")
    newItem.classList.add("list-group-item")
    newItem.classList.add("d-flex")
    newItem.classList.add("align-item-center")
    
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add("form-check-input")
    input.addEventListener('change', function() {
        const done = this.checked; // Récupérer l'état de la case à cocher
        newItem.setAttribute('data-done', done); // Mettre à jour l'attribut de données
        // Ajouter ou retirer la classe "done" pour marquer l'élément comme fait ou non fait
        if (done) {
            newItem.classList.add('done');
        } else {
            newItem.classList.remove('done');
        }
    });
    newItem.append(input)

    const label = document.createElement('label')
    label.innerText = text
    label.classList.add("ms-2")
    label.classList.add("form-check-label")
    const id = 19
    label.htmlFor = "todo-"+id;
    newItem.append(label)

    const trash = document.createElement('button')
    trash.classList.add("ms-auto") 
    trash.classList.add("btn") 
    trash.classList.add("btn-danger") 
    trash.classList.add("btn-sm") 
    trash.addEventListener("click", deleteItem)
    newItem.append(trash)

    const poubelle = document.createElement('i')
    poubelle.classList.add("bi-trash")
    trash.append(poubelle)
    place.appendChild(newItem)
}

async function main(){
    /*requête api*/
    const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5',{
        headers: {
            Accept: 'application/json'
        }
    })

    const list = document.querySelector('.list-group')

    const items = await r.json()
    for (let item of items){
        list.append(createItem(item))
        
    }

    const form = document.querySelector('form');
    const submitBtn = document.querySelector('#submit-btn')
    

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

         const FormData = document.querySelector('.form-control').value

        addItem(FormData)

        console.log(FormData)
    })

    const filters = document.querySelector('#filters')
    const listOfItems = document.querySelector('.list-group')

    filters.addEventListener('click', (e) => {
        const selectedCategory = e.target.getAttribute('data-filter');
        const itemList = listOfItems.querySelectorAll('li');

        itemList.forEach(item=> {
            item.style.opacity = '1';
            const doneOrNot = item.getAttribute('data-done')
            console.log(doneOrNot)
        if (selectedCategory == 'faite'){
        if (doneOrNot == null && selectedCategory == 'faite') {
            item.style.opacity = '0.2';
            } else {
            }
        }else if (selectedCategory == 'à faire'){
            if (doneOrNot == null && selectedCategory == 'à faire') {
                item.style.display = 'none';
                } else {
                    item.style.opacity = '0.2';
                }
        }

        return itemList
        });
    })

}

main()








