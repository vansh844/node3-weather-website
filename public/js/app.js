

const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageO=document.querySelector('#message1')
const messageT=document.querySelector('#message2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location=search.value

    messageO.textContent='Loading...'
    messageT.textContent=''

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageO.textContent=data.error
        }
        else{
            messageO.textContent=data.location
            messageT.textContent=data.forecast
        }
    })
})
    console.log(location)
})