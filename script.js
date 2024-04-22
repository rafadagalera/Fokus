const html = document.querySelector('html')
const startBtn = document.querySelector('.app__card-primary-button')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const btns = document.querySelectorAll('.app__card-button')
const text = document.querySelector('.app__title')
const img = document.querySelector('.app__image')
const musicaFoco = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const timerOnScreen = document.querySelector('#timer')
const timerBtn = document.querySelector('#start-pause')
const startStop = document.querySelector('#start-pause span')
const displayTimer = document.querySelector('#timer')
const focusTimer = 1500
const shortTimer = 300
const longTimer = 900
let intervaloID = null
let timePassed = 1500
const timerOnSound = new Audio('/sons/play.wav')
const timerOffSound = new Audio('/sons/pause.mp3')
const timerFinishedSound = new Audio('/sons/beep.mp3')
const startStopImg = document.querySelector('.app__card-primary-butto-icon')



musicaFoco.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play()
    }
    else{
        musica.pause()
    }
})
focoBtn.addEventListener('click', ()=>{
    timePassed = focusTimer
    alterarContexto('foco')
    focoBtn.classList.add('active')
});
curtoBtn.addEventListener('click', ()=>{
    timePassed = shortTimer
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
});
longoBtn.addEventListener('click', () => {
    timePassed = longTimer
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
});



function alterarContexto(contexto){
    showTimer()
    btns.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    img.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            text.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">Mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            text.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong"> Faça uma pausa curta </strong>
            `    
            break;
        case 'descanso-longo':
            text.innerHTML = `Hora de voltar à superfície.<br> <strong class="app__title-strong"> Faça uma pausa longa </strong>`
            break;
        default:
            break;
    }   
}

const contagemRegressiva = () => {
    if (timePassed <= 0){
        timerFinishedSound.play()
        alert('Tempo finalizado!')
        zerar()
        return
    } 
    timePassed -= 1
    showTimer()
}
timerBtn.addEventListener("click",iniciarOuPausar)

function iniciarOuPausar(){
    
    if (intervaloID){
        zerar()
        timerOffSound.play()
        return
    }
    intervaloID = setInterval(contagemRegressiva,1000)
    timerOnSound.play()
    startStop.textContent = "Parar"
    startStopImg.removeAttribute('')
    startStopImg.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloID)
    intervaloID = null
    startStop.textContent = "Começar"
    startStopImg.removeAttribute('img')
    startStopImg.setAttribute('src', '/imagens/play_arrow.png')
    
}

function showTimer(){
    const tempo = new Date(timePassed * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timerOnScreen.innerHTML = `${tempoFormatado}`
}

shortTimer()