let text = window.document.querySelector('#text')
const adi = window.document.querySelector('#adi')
let ul = window.document.querySelector('#ul')

let tarefas = []

const checkEvento = (checkbox,span,objeto)=>{
    if(checkbox.checked){
        objeto.concluida = true
        span.style.textDecoration = 'line-through'
        span.style.color = 'rgba(255,255,255,0.4)'

    }
    else{
        objeto.concluida = false
        span.style.textDecoration = 'none'
    }
}
const deletaTarefa = (item,id)=>{
    item.remove()
    tarefas=tarefas.filter(tarefa => tarefa.id !== id)
}
const adiciona = () =>{
    if(text.value.length == 0){
        window.alert('Escreva sua tarefa')
    }
    else{
        let item = window.document.createElement('li')
        item.id = crypto.randomUUID()
        const objeto = {
            id: item.id,
            texto:text.value,
            concluida:false}
            tarefas.push(objeto)
       
       let span = window.document.createElement('span')
       span.textContent = objeto.texto
       let div = window.document.createElement('div')
       let checkbox = window.document.createElement('input')
       checkbox.type = 'checkbox'
       let buttonEdit = window.document.createElement('button')
       buttonEdit.textContent = 'Editar'
       let buttonExcluir = window.document.createElement('button')
       buttonExcluir.textContent = 'Excluir'

       div.classList.add('caixa-acoes')
       span.classList.add('span')
       checkbox.classList.add('checkbox')
       buttonEdit.classList.add('button-edit')
       buttonExcluir.classList.add('button-excluir')

       checkbox.addEventListener('change',()=>{
        checkEvento(checkbox,span,objeto)
       })

       buttonExcluir.addEventListener('click',()=>{
        deletaTarefa(item,objeto.id)
       })
       
       ul.appendChild(item)
       item.appendChild(span)
       div.appendChild(checkbox)
       div.appendChild(buttonEdit)
       div.appendChild(buttonExcluir)
       item.appendChild(div)
       text.value = ''
    }
}


adi.addEventListener('click',adiciona)
