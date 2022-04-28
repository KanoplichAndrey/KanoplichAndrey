

const main = document.querySelector('.main')
const scoreElem = document.getElementById('Score')
const levelElem = document.getElementById('Level')
const cont = document.getElementById('cont')
const nextTetroElem = document.getElementById('next-tetro')
const startBtn = document.getElementById('START')
const pauseBtn = document.getElementById('PAUSE')
const gameOver = document.getElementById('game-over')
let menu = document.getElementById('menu')
const form = document.getElementById('form')
const button = document.querySelector('.but');
const res = document.querySelector('#res');



let playfield = [] //рисую поле
function init() {
    let x=10
    let y = 20
    for(let i = 0;i<y;i++){
        playfield[i] = []
        for (let j = 0; j <x; j++) {
            playfield[i][j] = 0

        }

    }
    console.log(playfield)
}
init()



// activeTetro.shape = activeTetro.shape[0].map((val,index) => activeTetro.shape.map((row) =>row[index]).reverse());


// let gameSpeed = 400
let score = 0
let gameTimerId
let currentLevel = 1
let isPause = true;
let iSres =true
let possibleLevels = {
    1:{
        scorePerLine: 10,
        speed: 400,
        nextLevelScore: 500,
    },
    2:{
        scorePerLine: 15,
        speed: 300,
        nextLevelScore: 1000,
    },
    3:{
        scorePerLine: 20,
        speed: 200,
        nextLevelScore: 2000,
    },
    4:{
        scorePerLine: 30,
        speed: 100,
        nextLevelScore: 3000,
    },
    5:{
        scorePerLine: 50,
        speed: 50,
        nextLevelScore: Infinity
    },

}

let figures = {
    O: [
       [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    I:[
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    S: [
        [0, 1, 1, ],
        [1, 1, 0, ],
        [0, 0, 0, ],

    ],
    Z: [
        [1, 1, 0, ],
        [0, 1, 1, ],
        [0, 0, 0, ],
    ],
    L: [
        [1, 0, 0, ],
        [1, 1, 1, ],
        [0, 0, 0, ],
    ],
    J: [
        [0, 0, 1, ],
        [1, 1, 1, ],
        [0, 0, 0, ],
    ],
    T: [
        [1, 1, 1, ],
        [0, 1, 0, ],
        [0, 0, 0, ],
    ],

}

let activeTetro = getNevTetro()
let nextTetro = getNevTetro()
// ячейка 1 это движущиеся
// ячейка 0 это пустая
// ячейка 2 это фиксированая

function draw() { // отвечает за отображение фигуры

    let mainInerHTML = '';
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) { // смотрим на значение ячейки
                mainInerHTML += '<div class="cell movingcell"></div>' //если 1 то добавляем класс который красит ячейку
            } else if (playfield[y][x] === 2) { // если  2 фиксируем фигуру
                mainInerHTML += '<div class="cell fixedcell"></div>'
            } else {
                mainInerHTML += '<div class="cell"></div>' // если не 1 оставляем ячейку не тронутой
            }

        }
    }
    
    main.innerHTML = mainInerHTML

}

 function drawNextTetro(){
     let nextTetroInnerHTML = ''
    for (let y = 0; y < nextTetro.shape.length; y++) {
        for (let x = 0; x < nextTetro.shape[y].length; x++) {
          if(nextTetro.shape[y][x]){
              nextTetroInnerHTML += '<div class="cell movingcell"></div>'
          } else{
            nextTetroInnerHTML += '<div class="cell"></div>'
          }

        }
        nextTetroInnerHTML +=  '<br/>'
    }
    nextTetroElem.innerHTML = nextTetroInnerHTML
    }


function removePrevActiveTetro() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) {
            if (playfield[y][x] === 1) {
                playfield[y][x] = 0;
            }
        }
    }
}

function addActiveTetro() {
    removePrevActiveTetro()
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] === 1) {
                playfield[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x]
            }

        }
    }
}
    function rotateTetro(){
        const prevTetroState = activeTetro.shape;
        activeTetro.shape = activeTetro.shape[0].map((val,index) =>
        activeTetro.shape.map((row) =>row[index]).reverse()
        );
        if(hasCllisions()) {
            activeTetro.shape = prevTetroState;
        }
    }

 // проверка столкновения
function hasCllisions() {
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] && // является ли единичкой
                 (playfield[activeTetro.y + y] === undefined || // не вышли ли единички за низ игрового поля
                 playfield[activeTetro.y + y][activeTetro.x+x]=== undefined ||// вышли ли единички влево или право за пределы поля
                 playfield[activeTetro.y + y][activeTetro.x+x]=== 2)// проверка на столкновение с фигурой
                 ) {

        return true
        }
    }
}
return false
}



function removeFullLines() {
    let canRemoveLine = true;
    filledLine= 0
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) { //проходимся по полю
            if (playfield[y][x] !== 2) {
                canRemoveLine = false;
                break;
            }
        }
        if (canRemoveLine) {
            playfield.splice(y, 1);
            playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            filledLine += 1


        }
        canRemoveLine = true
    }
    switch (filledLine) {
        case 1:
        score += possibleLevels[currentLevel].scorePerLine
        break;
        case 2:
        score += possibleLevels[currentLevel].scorePerLine * 3
        break;
        case 3:
            score += possibleLevels[currentLevel].scorePerLine * 6
        break;
        case 4:
        score += possibleLevels[currentLevel].scorePerLine * 12
        break;
    }

        scoreElem.innerHTML= score
        
    if(score>= possibleLevels[currentLevel].nextLevelScore){
        currentLevel ++
        levelElem.innerHTML = currentLevel
    }
}
    function getNevTetro(){
        const possibleFigures = 'OISZLJT';
        const rand = Math.floor(Math.random()*7);
        const nevTetro = figures[possibleFigures[rand]];
        return {
            x: Math.floor((10 - nevTetro[0].length)/2),
            y: 0,
            shape: nevTetro,

        };
    }

// фиксация фигуры
function fixTetro() {
    for (let y = 0; y < playfield.length; y++) {
        for (let x = 0; x < playfield[y].length; x++) { //проходимся по полю
            if (playfield[y][x] === 1) { // если встретили на пути фигуру
                playfield[y][x] = 2 // меняем ей цвет, фиксируем фигуру
            }

        }
    }



}
function moveTetroDown(){
    
        activeTetro.y += 1
    if (hasCllisions()) {
        activeTetro.y -= 1
        fixTetro()
        removeFullLines()
        activeTetro = nextTetro;
        nextTetro = getNevTetro()
        if(hasCllisions()){
           
            reset()
        }

    }
    }
     function reset(){
         isPause = true
         clearTimeout(gameTimerId)

init()
draw()

gameOver.style.display = 'block'
// form.style.display = 'block'
// form.style.transition=  'all' + 3 + 's ease-out'
// form.style.transform =  'scale(2)';

nextTetroElem.style.display = 'none'
//////////////////////////////////////////////////////////////////
let menuO ={
    posX : 20,
    posY : 100,
    update : function() {
        // var ballElem=document.getElementById('IBall');

        form.style.top=this.posX+"px";
        form.style.left=this.posY+"px";
       
        // form.style.position = "fixit";
       
    }
}



menuO.update()
//////////////////////////////////////////////////////////////////
 

function formMenu(){
    if(window.innerWidth <1160){
       
    // form.style.top= 190 +"px"
    // form.style.left= 426 +"px"
    

    form.style.transition= 3 +'s'
    //  menu.style.top= 10 +"%"
    //  menu.style.left= 0 +"%"
    menu.style.transition= 3 +'s'

    //  function toTop( ) {
        
    //   let g=  
      form.style.top=(menu.offsetTop + 185  - form.offsetHeight)+'px';
    //    let f = 
       form.style.left=(menu.offsetLeft + 737  + menu.offsetWidth/2-form.offsetWidth/2)+'px';
       console.log(g)
       console.log(f)
       menuO.update()
    //    45
    //    37
    // }
    // toTop( )
    
} else{
   

    form.style.top= 20 +"px"
    form.style.transition= 3 +'s'
    menu.style.left= 10 +"px"
    menu.style.transition= 3 +'s'

}
}
formMenu()

 }
 console.log(form.getBoundingClientRect())
// }

// function dropTetro(){

//     for (let y = activeTetro.y; y < playfield.length; y++) {
//         activeTetro.y += 1
//         if(hasCllisions() ){
//             activeTetro.y -= 1;
//             break;
//         }
//     }
// }
document.onkeydown = function (e) { // управление
    if(!isPause){
    if (e.key === 'ArrowLeft') {
        // moveTetroLeft()//двигаем фигурку влево
        activeTetro.x -= 1
        if (hasCllisions()) {
            activeTetro.x += 1
        }

    }
    if (e.key === 'ArrowRight') {
        // moveTetroRight()//двигаем фигурку вправо
        activeTetro.x += 1
        if (hasCllisions()) {
            activeTetro.x -= 1
        }
    }
    if (e.key === "ArrowDown") {
        // ускоряем фигурку
        moveTetroDown()
    }
    if (e.key === "ArrowUp") {

        activeTetro.y += 1
        rotateTetro()
    }
    // else if(e.code === "Space" ){

    //         dropTetro()

    // }
///////////////////////////////////////////////////////////////////////
// console.log(e)

//////////////////////////////////////////////////////////////////////////////////////////

updateStateGame()

}
}
  function updateStateGame(){
      if(!isPause){
      addActiveTetro();
    draw() 
    drawNextTetro();

  }
}

  pauseBtn.addEventListener('click', (e) => {
     clearTimeout(gameTimerId)
   isPause = !isPause
  if(isPause){
    let numbers = document.createElement('div');
    let body = document.querySelector('#game')
    numbers.id='ss'
    numbers.textContent ='Pause';
    numbers.style.position='absolute'
   

    if(window.innerWidth < 900){
        
        numbers.style.top = 370 +'px'
        numbers.style.left = 390 +'px'
        numbers.style.fontSize = 100 +'px'   
    }else{
        numbers.style.fontSize=330 + 'px'
        numbers.style.top = 280 +'px'
        numbers.style.left = 515 +'px'
    }
    body.prepend(numbers)

  }
   if(!isPause){
        let ss = document.getElementById('ss')
        ss.textContent =''
        gameTimerId= setTimeout(startGame,possibleLevels[currentLevel].speed)
  }

    });
startBtn.addEventListener('click', () => {
    scoreElem.innerHTML = 0
    score = 0
    isPause= false
    gameTimerId= setTimeout(startGame,possibleLevels[currentLevel].speed)
    gameOver.style.display = 'none'

    // form.style.display = 'none'
    form.style.top= -700 +"px"
    nextTetroElem.style.display = 'block'
    menu.style.left= -700 +"px"
    });
/////////////////////////////////////////////////////////////////////////////////////
    res.addEventListener('click', () => {

        menu.style.left= 10 +"px"
        menu.style.transition= 3 +'s'
        iSres = !iSres
        if(!iSres){
            console.log(res)
           menu.style.left= -700 +'px' 
        }
        
    })
 scoreElem.innerHTML = score
 levelElem.innerHTML = currentLevel

// addActiveTetro();
draw();
// drawNextTetro();

function startGame(){

    moveTetroDown()
    if(!isPause){

        updateStateGame()

    gameTimerId= setTimeout(startGame,possibleLevels[currentLevel].speed)
    }

    // }


}
// setTimeout(startGame,possibleLevels[currentLevel].speed)

let phones = [];



window.phones = phones

const container = document.querySelector('.container')
var record =0
let kano 
function refreshPhones(){
    const usersListFromLS = localStorage.getItem('users');
    const users = usersListFromLS ? JSON.parse(usersListFromLS): [];
    container.innerHTML = '';
    
    users.forEach((user) => {
        // let PageHTML="";
        const item = document.createElement('div');
        item.id='hg'
        item.innerHTML = user.num + ':  ' + user.title + '  '+  user.cost  ;
        container.appendChild(item);

        function recor(){
     
     
       let item1=document.querySelectorAll('#hg')
        if(item1.length>1){
            // container.remove(item1)
            localStorage.clear() 
        }
        // console.log(item1.length)
        // for (let i = 0; i < item1.length; i++) {
        //    for(key in user){
        //       }   
            //    
               
            if(user.cost > record){
                record = user.cost
                kano = user.title
                
                // console.log(record)
                
                
            }
                  
            
               
         
            // 
            //  
        }
          
        // console.log(user.cost)
        recor()
      
    })
 
console.log(record) 



    let PageHTML="";
            PageHTML+='<tr><th> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp   <tr><th> Место </th><th> Имя </th><th> Очки </th></tr>';
            let span = document.querySelector('#span').innerHTML=PageHTML
}
refreshPhones();

button.addEventListener('click',() => {
    const input = document.querySelector('.in');
    form.style.top= -700 + 'px';

    const usersListFromLS = localStorage.getItem('users');
    const users = usersListFromLS ? JSON.parse(usersListFromLS): [];

    const newUser = {
        num: users.length + 1,
        title: input.value,
        cost: score,
    };

    const userFromLS = users.find((u) => u.title === newUser.title);
    const isUserExist = !!userFromLS;

    if (isUserExist){
        newUser.score = newUser.score + userFromLS.score;
    }

    const newUserList = [
        ...users, ...users.filter((u) => u.score !== newUser.score),
        newUser,
    ]

    phones = newUserList;

    localStorage.setItem('users', JSON.stringify(newUserList));
    refreshPhones();
    input.value = '';

})