const Random_Quote_API_URL='http://api.quotable.io/random'
const quoteDisplayElement=document.getElementById('quoteDisplay')
const quoteInputElement=document.getElementById('quoteInput')
const timerElement=document.getElementById('timer')
let correct=true;

quoteInputElement.addEventListener("input",()=>{
    const arrayQuote=quoteDisplayElement.querySelectorAll('span')
    const arrayValue=quoteInputElement.value.split('')

    arrayQuote.forEach((charSpan,index)=>{
        const charValue=arrayValue[index]

        if(charValue==null){
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct=false
        }
       else if(charValue===charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
            
        }else{
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
            correct=false
        }
    })
    if(correct)renderNextQuote()
})


function getRandomQuote(){
    return fetch(Random_Quote_API_URL)
    .then(response=>response.json())
    .then(data=>data.content)
}


async function renderNextQuote(){
    const quote=await getRandomQuote()
    quoteDisplayElement.innerHTML=''
    quote.split("").forEach(char => {
        const charSpan=document.createElement('span')
        charSpan.innerText=char
        quoteDisplayElement.appendChild(charSpan)
        
    });
    quoteInputElement.value=null
    startTimer()
}
renderNextQuote()

 let startTime=new Date()

function startTimer(){
    timerElement.innerText=0

    setInterval(() => {
        timerElement.innerText=getTimerTime()
        
    }, 1000);
}


function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}