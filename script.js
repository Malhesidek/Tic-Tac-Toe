const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")
const fourth = document.querySelector(".fourth")
const fifth = document.querySelector(".fifth")
const sixth = document.querySelector(".sixth")
const seventh = document.querySelector(".seventh")
const eight = document.querySelector(".eight")
const nineth = document.querySelector(".nineth")


var boxes = [first, second, third, fourth, fifth, sixth, seventh, eight, nineth]

var flag = true

var player = document.querySelector('.player')

var boxNumbers = {'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5, 'sixth': 6, 'seventh': 7, 'eight': 8, 'nineth': 9}

var gameField = new Array(9).fill(0)

var refreshBtn = document.querySelector('.refresh')

var xTile = document.querySelectorAll('#X')
var oTile = document.querySelectorAll('#O')

var xScore = document.querySelector('#X_score_num')
var oScore = document.querySelector('#O_score_num')
var xScoreNum = 0
var oScoreNum = 0

xScore.textContent = xScoreNum
oScore.textContent = oScoreNum

function opacityHover(){
    if (flag === true && gameField[boxNumbers[this.classList[1]] - 1] === 0){
      this.childNodes[1].style.opacity = "50%"
      this.childNodes[1].style.display = "block"
    }
    else if (flag === false && gameField[boxNumbers[this.classList[1]] - 1] === 0){
      this.childNodes[3].style.opacity = "50%"
      this.childNodes[3].style.display = "block"
    }
}

function opacityUnhover(){
  if (flag === true && gameField[boxNumbers[this.classList[1]] - 1] === 0){
    this.childNodes[1].style.opacity = "100%"
    this.childNodes[1].style.display = "none"
  }
  else if (flag === false && gameField[boxNumbers[this.classList[1]] - 1] === 0){
    this.childNodes[3].style.opacity = "100%"
    this.childNodes[3].style.display = "none"
  }
}

function checkGame(f) {
  let conditions = [1,2]
  if (f[0] === f[1] && f[1] === f[2] && conditions.includes(f[0])){
    return f[0] === 1 ? true : false
  }
  else if (f[0] === f[3] && f[3] === f[6] && conditions.includes(f[0])){
    return f[0] === 1 ? true : false
  }
  else if (f[0] === f[4] && f[4] === f[8] && conditions.includes(f[0])){
    return f[0] === 1 ? true : false
  }
  else if (f[1] === f[4] && f[4] === f[7] && conditions.includes(f[1])){
    return f[1] === 1 ? true : false
  }
  else if (f[3] === f[4] && f[4] === f[5] && conditions.includes(f[3])){
    return f[3] === 1  ? true : false
  }
  else if (f[2] === f[4] && f[4] === f[6] && conditions.includes(f[2])){
    return f[2] === 1 ? true : false
  }
  else if (f[2] === f[5] && f[5] === f[8] && conditions.includes(f[2])){
    return f[2] === 1 ? true : false
  }
  else if (f[6] === f[7] && f[7] === f[8] && conditions.includes(f[8])){
    return f[8] === 1 ? true : false
  }
  else {
    return undefined
  }
}

function gameResult(f){
  if (checkGame(gameField) === true){
    player.innerHTML = 'Player 1 wins!'
    xScoreNum += 1
    xScore.textContent = xScoreNum
    return true
  }
  else if (checkGame(gameField) === false){
    player.innerHTML = 'Player 2 wins!'
    oScoreNum += 1
    oScore.textContent = oScoreNum
    return false
  }
  else if (!(f.includes(0))){
    player.innerHTML = 'Draw!'
    return null
  }
}

var createDiv = function(){
  let element
  if (flag === true){
    element = document.createElement('div')
    element.setAttribute('id', 'square')
    document.querySelector('.player').innerHTML = 'Player 2'
  }
  else {
    element = document.createElement('div')
    element.setAttribute('id', 'circle')
    document.querySelector('.player').innerHTML = 'Player 1'
  }
  return element
}

// function boxClickHandler() {
//   if (this.childNodes[0] === undefined) {
//     let e = createDiv();
//     this.append(e);
//     gameField[boxNumbers[this.classList[1]] - 1] = flag ? 1 : 2;
//     flag = !flag;
//     let result = gameResult(gameField);

//     if (result === true || result === false) {
//       // Remove the click event listener for this box
//       removeEvents()
//     }
//   }
// }

function boxClickHandler() {
  if (gameField[boxNumbers[this.classList[1]] - 1] === 0) {
    if (flag) {
      this.childNodes[1].style.opacity = '100%'
      this.childNodes[1].style.display = 'block'
    }
    else {
      this.childNodes[3].style.opacity = '100%'
      this.childNodes[3].style.display = 'block'
    }
    gameField[boxNumbers[this.classList[1]] - 1] = flag ? 1 : 2;
    flag = !flag;
    let result = gameResult(gameField);

    if (result === true || result === false) {
      // Remove the click event listener for this box
      removeEvents()
    }
    
  }
}

function addEvents(){
  for (let box of boxes) {
    box.addEventListener("mouseover", opacityHover)
    box.addEventListener("mouseout", opacityUnhover)
    box.addEventListener("click", boxClickHandler);
  }
}

function removeEvents(){
  for (let box of boxes) {
    box.removeEventListener("mouseover", opacityHover);
    box.removeEventListener("mouseout", opacityUnhover);
    box.removeEventListener("click", boxClickHandler);
  }
}

function refreshGame(){
  removeEvents()
  boxes.forEach((box) => {
    box.childNodes[1].style.opacity = "100%"
    box.childNodes[3].style.opacity = "100%"
    box.childNodes[1].style.display = 'none'
    box.childNodes[3].style.display = 'none'
  })
  player.innerHTML = 'Player 1'
  flag = true
  gameField = new Array(9).fill(0)
  addEvents()
}

refreshBtn.addEventListener('click', refreshGame)

addEvents()


