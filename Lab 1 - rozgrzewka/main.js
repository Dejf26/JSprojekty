// notatnik z zajęć
const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')

const btnPrzelicz = document.querySelector('#przelicz')

const sumaWyn = document.querySelector('#suma')
const sredniaWyn = document.querySelector('#srednia')
const minWyn = document.querySelector('#min')
const maxWyn = document.querySelector('#max')


btnPrzelicz.addEventListener('click', () => {
    sumaWyn.innerHTML = 'Suma: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value))
    sredniaWyn.innerHTML = 'Średnia: '+ (parseInt(liczba1.value) + parseInt(liczba2.value) + parseInt(liczba3.value) + parseInt(liczba4.value)) /4
    minWyn.innerHTML = 'Min: '+ Math.min(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))
    maxWyn.innerHTML = 'Max: '+ Math.max(parseInt(liczba1.value), parseInt(liczba2.value), parseInt(liczba3.value), parseInt(liczba4.value))

    
    // console.log(liczba1.value)
     
})
