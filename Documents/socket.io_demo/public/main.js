
console.log('running')
const socket = io('http://localhost:3000')
let form = document.getElementById('form')
let container = document.querySelector('.container')
let input = document.getElementById('text')
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let message = input.value
    if (message) {
        append(`you:${message}`, 'right')
        socket.emit('send message', message)
    }
    input.value = ''
})
let append = (message, position) => {
   const element = document.createElement('div')
    element.innerHTML = message
    element.classList.add('message')
    element.classList.add(position)
    container.append(element)
}
let Username = prompt('Enter your good name')
socket.emit('new-user-joined', Username)
socket.on('user-joined', name => {
    append(`${name}  joined chat`, 'left')
})


socket.on('receive message', (data) => {
    console.log(data.message)
    append(`${data.name}:${data.message}`, 'left')
})
socket.on('Join-room', (msg) => {
    console.log(msg)
    append(`${msg}`, "left")
})

