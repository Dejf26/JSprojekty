// notatnik z zajęć

//
const value1 = document.querySelector('#value1')
const value2 = document.querySelector('#value2')
const value3 = document.querySelector('#value3')
const value4 = document.querySelector('#value4')

const btnCalculate = document.querySelector('#calculate')

const sumCalc = document.querySelector('#sum')
const avgCalc = document.querySelector('#avg')
const minCalc = document.querySelector('#min')
const maxCalc = document.querySelector('#max')


btnCalculate.addEventListener('click', () => {
    sumCalc.innerHTML = 'Suma: '+ (parseInt(value1.value) + parseInt(value2.value) + parseInt(value3.value) + parseInt(value4.value))
    avgCalc.innerHTML = 'Średnia: '+ (parseInt(value1.value) + parseInt(value2.value) + parseInt(value3.value) + parseInt(value4.value)) /4
    minCalc.innerHTML = 'Min: '+ Math.min(parseInt(value1.value), parseInt(value2.value), parseInt(value3.value), parseInt(value4.value))
    maxCalc.innerHTML = 'Max: '+ Math.max(parseInt(value1.value), parseInt(value2.value), parseInt(value3.value), parseInt(value4.value))
})

//
const result2 = document.querySelector('#result2')
const num=document.getElementsByClassName('num')

let div, input, button;

function Add(){
    div = document.createElement("div")
    input = document.createElement('input')
    button = document.createElement('button')
    button.innerHTML="Usuń"
    button.addEventListener('click',(ev)=>{
        ev.currentTarget.parentNode.remove()
        Calculate()
    });

    input.type = "number"
    input.value = 0
    input.className = "num"

    input.addEventListener('input', Calculate)
    div.appendChild(input)
    div.appendChild(button)

    document.querySelector("#fields").appendChild(div)
    Calculate()
}

function Calculate(){
    let arr = []
    for (let i of num) {
        arr.push(parseInt(i.value))
    }

    const res = arr.reduce((sum, val) => sum + val)
    result2.innerHTML = `Suma: ${res}, Średnia: ${res/arr.length}, 
    Min: ${Math.min(...arr)}, Max: ${Math.max(...arr)}`
}

let add = document.getElementById("add")
add.addEventListener('click', Add)
Add()
Add()
Add()
