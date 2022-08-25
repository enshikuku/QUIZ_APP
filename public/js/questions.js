import questions from "./data.js"

let form = document.querySelector('form')
questions.forEach(question => {
    let div = document.createElement('div')
    div.className = 'form-input'
    let p = document.createElement('p')
    p.className = 'question'
    p.textContent = question.question
    let choices = document.createElement('div')
    question.choices.forEach(choice => {
        let div = document.createElement('div')
        div.className= 'choice'
        div.innerHTML = `<input type="radio" name="q${question.id}"> ${choice}`
        div.addEventListener('click', () => {
            // div.innerHTML = `<input type="radio" name="q${question.id}" checked> ${choice}`
            document.getElementsByName(`q${question.id}`).forEach(radioBtn => radioBtn.removeAttribute('checked'))
            div.firstElementChild.setAttribute('checked', '')
        })
        choices.appendChild(div)
    })
    div.appendChild(p)
    div.appendChild(choices)
    form.appendChild(div)
})