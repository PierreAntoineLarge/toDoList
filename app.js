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
    const child = document.querySelector('li')
    child.parentNode.removeChild(child)
}

async function main(){

    const r = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5',{
        headers: {
            Accept: 'application/json'
        }
    })
    console.log(r)

    const list = document.querySelector('.list-group')

    const items = await r.json()
    console.log(list)
    for (let item of items){
        list.append(createItem(item))
        
    }

}

main()