console.log("Client Side File loaded")

// fetch('https://puzzle.mead.io/puzzle').then((response=>{

// response.json().then((data)=>{

//     console.log(data)

// })



// }))

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messagetwo= document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{

    const location = search.value

    e.preventDefault()

    
    messagetwo.textContent = ""
    messageOne.textContent = "Loading....."
fetch("http://localhost:3000/weather?address="+location).then((response=>{

response.json().then((data)=>{

    if(data.error){
        messagetwo.textContent = data.error,
        messageOne.textContent=''

    }else{
        messageOne.textContent = data.location
        messagetwo.textContent=data.forecast
        
    }
    
})


}))


})