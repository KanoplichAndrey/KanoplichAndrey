'use strict'

const backCanvas = document.querySelector('#background_controller');
const backContext = backCanvas.getContext('2d');

const canvas = document.querySelector('#game_field');
const context = canvas.getContext('2d');


//ПОЛЕ И ЯЧЕЙКИ
//Размер поля
const fieldSize = { //параметры должны делиться на размер ячейки без остатка
  x: parseInt(canvas.offsetWidth), 
  y: parseInt(canvas.offsetHeight)
};
console.log('Размер поля: ', fieldSize.x, fieldSize.y);
const CELL_SIZE = 24; //одная ячейка 24px
const cell = {
  size: CELL_SIZE, //размер ячейки
  quarter: CELL_SIZE / 4, //четвертинка ячейки
  amount: { //кол-во ячеек
    x: fieldSize.x / CELL_SIZE,
    y: fieldSize.y / CELL_SIZE
  },
  center: { // центральная ячейка на поле, округл в меньшую сторону
    x: Math.floor(fieldSize.x / 2 / CELL_SIZE),
    y: Math.floor(fieldSize.y / 2 / CELL_SIZE)
  }
};
console.log('Кол-во ячеек: ', cell.amount.x, cell.amount.y);
console.log('Центральная ячейка: ', cell.center.x, cell.center.y);

// let isGameOver = false; // для RequestAnimationFrame

//CЧЕТ СЧЕТ СЧЕТ
const scoreSpan = document.querySelector('#score_value');
let score = 0; //счет


//ЕДА ЕДА ЕДА
const foodArray = [ //массив со всеми картинками еды
  'img/food1.png',
  'img/food2.png',
  'img/food3.png',
  'img/food4.png',
  'img/food5.png',
  'img/food6.png',
  'img/food7.png',
  'img/food8.png',
  'img/food9.png',
  'img/food10.png',
  'img/food11.png',
  'img/food12.png',
  'img/food13.png',
  'img/food14.png',
  'img/food15.png',
  'img/food16.png',
  'img/food17.png',
];
let foodImg = new Image(); 
foodImg.src = foodArray[randomizer(0, foodArray.length - 1)]; //рандомная еда
let food = { //рандомная генерация еды
  x: Math.floor(Math.random() * cell.amount.x) * cell.size,
  y: Math.floor(Math.random() * cell.amount.y) * cell.size
};
let isFoodChange = false; //указывается, если еда требует перегенерации


//ЗМЕЙКА ЗМЕЙКА ЗМЕЙКА
let snake = [];
let segmentCount = 16; //
//Скорость змейки (на столько пикселей она сдвигается за один кадр)
const speed = cell.size / 6;
//Первоначальные координаты змеи
snake[0] = {
  x: cell.center.x * cell.size,
  y: cell.center.y * cell.size
};
//режим вечеринки - змейка мигает разными цветами
const partyCheckBox = document.querySelector('#party-checkbox');


//ЗВУКИ ЗВУКИ ЗВУКИ
let isAudioinit = false;
//Создаем объекты Audio
const audioGameOver = new Audio('sound/gameover.mp3');
const audioEat = new Audio('sound/eat.mp3');
function soundInit() {
  isAudioinit = true;
  audioGameOver.play();
  audioGameOver.pause(); 
  audioEat.play();
  audioEat.pause(); 
}
function soundEat() {
  audioEat.currentTime=0.5;
  audioEat.play();
}
function soundGameOver() {
  audioGameOver.currentTime=0;
  audioGameOver.play();
}


//Ф-ЦИЯ ДЛЯ РАНДОМНЫХ ЧИСЕЛ В ДИАПАЗОНЕ от a до b
function randomizer(a, b) { //a:ниж граница диапазона, b:верхняя
  return Math.floor(
    Math.random() * (b - a + 1)
    ) + a;
  }
//Ф-ЦИЯ ДЛЯ РАНДОМНОГО ЦВЕТА
function randomColor() {
  return '#' + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16)) + ((~~(Math.random() * 255)).toString(16));
}


//НАПРАВЛЕНИЕ ДВИЖЕНИЯ
document.addEventListener('keydown', changeDirection); //событие срабатывает на любую нажатую клавишу
(function() { //подписываемся на событие click для каждой кнопки-стрелки (svg)
  document.querySelector('#up').addEventListener('click', dirUp);
  document.querySelector('#right').addEventListener('click', dirRight);
  document.querySelector('#down').addEventListener('click', dirDown);
  document.querySelector('#left').addEventListener('click', dirLeft);
})();
(function() { //то же самое для touch для кнопок на мобилке (svg)
  document.querySelector('#mob-up').addEventListener('touchstart', dirUp);
  document.querySelector('#mob-right').addEventListener('touchstart', dirRight);
  document.querySelector('#mob-down').addEventListener('touchstart', dirDown);
  document.querySelector('#mob-left').addEventListener('touchstart', dirLeft);
})();

let dir; //хранит направление движ-я
let nextDir; //хранит будущее направление движ-я

//Ф-ЦИЯ в завис. от нажатой клавиши выз. соотв. ф-цию изм-я напрвл-я и делает soundInit()
function changeDirection(EO) { 
  EO = EO || window.event;

  if (isAudioinit === false) {
    soundInit();
  }

  if (EO.keyCode === 38) {
    dirUp(EO);
  } 
  else if (EO.keyCode === 39) {
    dirRight(EO);
  } 
  else if (EO.keyCode === 40) {
    dirDown(EO);
  }
  else if (EO.keyCode === 37) {
    dirLeft(EO);
  } 
}
function dirUp(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  if (dir != 'down') {
    nextDir = 'up';
  }
  return;
}
function dirRight(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  if (dir != 'left') {
    nextDir = 'right';
  }
  return;
}
function dirDown(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  if (dir != 'up') {
    nextDir = 'down';
  }
  return;
}
function dirLeft(EO) {
  EO = EO || window.event;
  EO.preventDefault();
  if (dir != 'right') {
    nextDir = 'left';
  }
  return;
}


//РИСОВАНИЕ ЗМЕИ
function drawSnake() {
  for (let i = snake.length -1; i >= 0; i--) {
    context.beginPath();
    if (partyCheckBox.checked) {
      context.fillStyle = (i == 0) ? '#52638b' : randomColor();
    } else {
      context.fillStyle = (i == 0) ? '#52638b' : '#7189bf';
    }
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0; 
    context.arc(snake[i].x + cell.quarter * 2, snake[i].y + cell.quarter * 2, cell.quarter * 2, 0, Math.PI*2, false);
    context.fill();
  }
}


//ЧЕРЕЗ СТЕНЫ
function throughWall(snakeX, snakeY) {
  if (snakeX < 0) {
    snakeX = fieldSize.x - (cell.size);
  } 
  else if (snakeX > (fieldSize.x - cell.size)) {
    snakeX = 0;
  } 
  if (snakeY < 0) {
    snakeY = fieldSize.y - cell.size;
  } 
  else if (snakeY > (fieldSize.y - cell.size)) {
    snakeY = 0;
  }
  return {
    x: snakeX,
    y: snakeY
  };
}


function renderingСontrol() {
  context.clearRect(0, 0, fieldSize.x, fieldSize.y);

  //ЗАПУСК ГЕНЕРАЦИИ ЕДЫ
  (function () {
    try { //Если происходит ошибка при генерации еды, она ловится и генерация запускается снова. (На всякий случай)
      if (isFoodChange) {
        isFoodChange = false; //рандомная еда
        foodImg.src = foodArray[randomizer(0, foodArray.length - 1)];
      }
      context.shadowBlur = 20;
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 2;
      context.shadowColor = '#be6c6a'; 
      context.drawImage(foodImg, food.x, food.y); //рисование еды
    }
    catch (ex) {
      console.error('возникло исключение типа: ' + ex.name);
      isFoodChange = true;
      if (isFoodChange) {
        isFoodChange = false;
        foodImg.src = foodArray[randomizer(0, foodArray.length - 1)];
      }
      context.shadowBlur = 20;
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 2;
      context.shadowColor = '#be6c6a'; 
      context.drawImage(foodImg, food.x, food.y);
    }
  })()

  //Первоначальные координаты змеи
  let snakeX = snake[0].x; 
  let snakeY = snake[0].y;

  //ЛОГИКА ДВИЖЕНИЯ ЗМЕИ
  (function () {
      //Змейка поворачивает только в координатах ячеек
    if (snakeX % cell.size === 0 && (nextDir == 'up' || nextDir == 'down')) {
      dir = nextDir;
      nextDir = '';
    } else if (snakeY % cell.size === 0 && (nextDir == 'right' || nextDir == 'left')) {
      dir = nextDir;
      nextDir = '';
    }
      //Поворот змейки
    if (dir == 'left') { 
      snakeX -= speed;
    }
    else if (dir == 'up') {
      snakeY -= speed;
    }
    else if (dir == 'right') {
      snakeX += speed;
    }
    else if (dir == 'down') {
      snakeY += speed;
    }
  })()
  
  //Переменная для хрананения позиции змейки после прохождения через стену
  let afterWallPos = {};
  //Если змея достигла стены, вызывается ф-ция прохождения через стену
  if (snakeX < 0 || snakeX > (fieldSize.x - cell.size)
  || snakeY < 0 || snakeY > (fieldSize.y - cell.size)) 
  {
    afterWallPos = throughWall(snakeX, snakeY);
    snakeX = afterWallPos.x;
    snakeY = afterWallPos.y;
  }

  //ЗАПУСКАЕМ РИСОВАНИЕ ЗМЕИ
  drawSnake();

  //ПИТАНИЕ ЗМЕИ
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    soundEat();
    scoreSpan.textContent = score;
    setTimeout(changeFood, 0);
    function changeFood() {
      isFoodChange = true;
    }
    food = { //рандомная генерация позиции еды
      x: Math.floor(Math.random() * cell.amount.x) * cell.size,
      y: Math.floor(Math.random() * cell.amount.y) * cell.size
    };
    segmentCount += 8;
  } else if (!dir || snake.length > segmentCount) {
    snake.pop(); //Удаляем последний эл-т массива змеи
  }

  //Создаем новую голову змеи
  let newHead = {
    x: snakeX,
    y: snakeY
  };

  //ЦИКЛ проверки на столкновение с хвостом
  for(let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y ) {
      // console.log('хвост съеден');
      setTimeout(gameOver, 100);
    }
  }

  //Добавляем элемент 'голова' в начало массива змеи
  snake.unshift(newHead); 

  // if (!isGameOver) {
  //   requestAnimationFrame(renderingСontrol);
  // }
}


let game = setInterval(renderingСontrol, 1000 / 60);
// requestAnimationFrame(renderingСontrol; //запускаем таймер, который будет рисовать игру


//НОВАЯ ИГРА при щелчке на кнопку ' Старт'
document.querySelector('#butt_start').addEventListener('click', newGame);
function newGame() {
  // isGameOver = false; // для RequestAnimationFrame
  document.location.reload();
}

//GAMEOVER GAMEOVER GAMEOVER 
function gameOver() {
  context.clearRect(0, 0, fieldSize.x, fieldSize.y);
  // isGameOver = true; // для RequestAnimationFrame
  clearInterval(game);
  showHiddenRecord();
}
//Показывает скрытый блок с текстом и кнопками после game over
function showHiddenRecord() {
  const recordText = document.querySelector('.hidden');
  recordText.style.display = "block";
  const finalScore = document.querySelector('#final_score');
  finalScore.textContent = score;
  soundGameOver();
}


//ВСПЛЫВАЮЩИЕ ПРАВИЛА
document.querySelector('#butt_rules').addEventListener('click', showRules);
document.querySelector('#close-rules-but').addEventListener('click', showRules);
const rules = document.querySelector('#rules');
let isRulesShow = false;
function showRules() {
  if (!isRulesShow) {
    rules.style.visibility = 'visible';
    rules.style.height = '550px';
    isRulesShow = true;
    return;
  }
  if (isRulesShow) {
    rules.style.visibility = 'hidden';
    rules.style.height = '0px';
    isRulesShow = false;
    return;
  }
}


//РЕКОРДЫ recordsArr =[{name: строка, score: число}, {name: value2, score: value2}, ...]
const recordsTable = document.querySelector('#records-table');
const tableNamesArr = document.querySelectorAll('.champ-name'); //доступ к ячейкам таблицы
const tableScoreArr = document.querySelectorAll('.champ-score'); //доступ к ячейкам таблицы
console.log( tableNamesArr, tableScoreArr);

const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php"; //Сервис для храниения переданных строк AjaxStringStorage2

let recordsArr = []; //Массив, получ. с сервера преобраз. с пом JSON.parse
const AJAX_PROJECT_NAME = 'amelevich_alina_2020_project_snake';

document.querySelector('#butt_save_record').addEventListener('click', startSaving);
document.querySelector('#butt-all-records').addEventListener('click', showRecords);

function startSaving(EO) {
  EO = EO || window.event;
  preSaveNewChamp();
}
function preSaveNewChamp() {
  //сохраняем счет в переменную
  const scoreValue = score;
  //Получаем введенный в поле текст (имя пользователя)
  const userNameInput = document.querySelector('#user_name');
  let nameValue = userNameInput.value.trim();
  if (!nameValue) {
    userNameInput.style.background = '#d6908f';
    userNameInput.focus();
    return;
  }
  fetchAndFillRecordsArr()
    .then(() => saveNewChamp(nameValue, scoreValue)); //при успехе вызываем след.ф-цию для сохранения значений в хэш
}

//только чтение массива с сервера без планирования изменения
function onlyFetchforReadRecordsArr() {
  // отдельно создаём набор POST-параметров запроса
  let postParams = new URLSearchParams();
  postParams.append('f', 'READ');
  postParams.append('n', AJAX_PROJECT_NAME);

  return fetch(ajaxHandlerScript, { method: 'post', body: postParams })
    .then( response => response.json() )
    .then( data => { recordsArr = JSON.parse(data.result || '[]'); } )
    .catch( error => { 
      console.error(error); 
      alert('Ошибка отображения рекордов!');
    });
}
let updatePassword;
//чтение массива с сервера и планирование его изменения
function fetchAndFillRecordsArr() {
  updatePassword = Math.random();

  // отдельно создаём набор POST-параметров запроса
  let postParams = new URLSearchParams();
  postParams.append('f', 'LOCKGET');
  postParams.append('n', AJAX_PROJECT_NAME);
  postParams.append('p', updatePassword);

  return fetch(ajaxHandlerScript, { method: 'post', body: postParams })
    .then( response => response.json() )
    .then( data => { recordsArr = JSON.parse(data.result || '[]'); } )
    .catch( error => { 
      console.error(error); 
      alert('Ошибка сохранения!');
    });
}
//обновление массива на сервере
function updateOnServerRecordsArr() {
  // отдельно создаём набор POST-параметров запроса
  let postParams = new URLSearchParams();
  postParams.append('f', 'UPDATE');
  postParams.append('n', AJAX_PROJECT_NAME);
  postParams.append('p', updatePassword);
  postParams.append('v', JSON.stringify(recordsArr));

  return fetch(ajaxHandlerScript, { method: 'post', body: postParams })
    .then( response => response.json() )
    .then( data => { console.log('успешно сохранено: ', data); } )
    .catch( error => { 
      console.error(error); 
      alert('Ошибка сохранения!');
    });
}

function saveNewChamp(nameValue, scoreValue) {
  let newChamp = {};
  newChamp.name = nameValue; //nameValue - строка
  newChamp.score = scoreValue; //scoreValue - число
  changeRecordsArr(newChamp); //сразу вызываем след.ф-цию для изменения массива
}
//Доб нов.результата в массив рекордов, сортировка по результатам и "выбывание" последнего элемента массива, если больше 10 эл-тов
function changeRecordsArr(newChamp) {
  recordsArr.push(newChamp);
  console.log( 'Массив с новым эл-том:', recordsArr);
  function compareScore(a, b) {
    return b.score - a.score;
  }
  recordsArr.sort(compareScore);
  console.log( 'Отсортированный массив дл.11:', recordsArr);
  if (recordsArr.length > 10) { //10- кол-во мест в таблице рекордов
    recordsArr = recordsArr.slice(0, 10);
    console.log( 'Обрезанный массив дл.10:', recordsArr);
  }
  console.log( 'Первый эл-т массива', recordsArr[0]);
  updateOnServerRecordsArr()
  .then(() =>  showRecords());
}
//Динамич.заполнение таблицы рекордов данными из переданного массива
function fillTable() {
  for (let i = 0; i < recordsArr.length; i++) {
    tableNamesArr[i].textContent = recordsArr[i].name;
    tableScoreArr[i].textContent = recordsArr[i].score;
  }
}
function showRecords() {
  recordsTable.style.display = "block";

  if (recordsArr.length == 0) {
    onlyFetchforReadRecordsArr()
    .then(() => fillTable());

    //КОНПКА НАЗАД В ТАБЛИЦЕ РЕКОРДОВ
    document.querySelector('#but-return-from-records').addEventListener('click', returnToGameOver);
  } else {
    fillTable();
    document.querySelector('#but-return-from-records').style.display = "none"; //скрыть кнопку 'назад' в таблице рекордов
  }
}

//КОНПКА НАЗАД В ТАБЛИЦЕ РЕКОРДОВ
function returnToGameOver() {
  recordsTable.style.display = "none";
}