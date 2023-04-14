/**
 * 
 * @param {{title:string, body:string}} item 
 * @return {HTMLElement}
 */
function createItem(item){
    const lister = document.createElement('li')
    const ensemble = document.querySelector('ul')
    console.log(ensemble)
    
    const ici = lister.innerText = item.title
    console.log(ici)
    lister.classList.add("todo")
    lister.classList.add("list-group-item")
    lister.classList.add("d-flex")
    lister.classList.add("align-item-center")
    ensemble.appendChild(lister)

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    lister.insertBefore(checkbox, ici)

    return lister
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