'use strict'
let numberOfRows;
let mas;
let body = document.querySelector('body')
let conteiner = document.createElement('div')
conteiner.className = 'conteiner'
body.appendChild(conteiner)

let numberClicks = document.createElement('p')
let fild = document.createElement('div')

let select = document.createElement('select');
let arr = {
  'easy': 8,
  'difficult': 10,
  'advanced': 12
};
conteiner.appendChild(select);
select.id = 'select'
for (let value1 in arr) {
  let p1 = document.createElement('option');
  let parent1 = document.querySelector('#select');
  p1.text = value1;
  p1.selected = false
  parent1.appendChild(p1);
}
select.addEventListener('change', function () {
  numberClicks.textContent = 0;
  for (let i = 0; i < fild.children.length;) {
    fild.removeChild(fild.children[i]);
  }
  this.selected = false
  numberOfRows = arr[this.value]
  if(conteiner.children.length>1){
    conteiner.removeChild(conteiner.children[1]);
  }
  start()
});


function start() {
  numberClicks.textContent = 0;
  conteiner.appendChild(numberClicks)
  fild.className = 'fild'
  conteiner.appendChild(fild)
  for (let i = 0; i < numberOfRows; i++) {
    let rou = document.createElement('div')
    rou.className = 'rou'
    fild.appendChild(rou)
    for (let j = 0; j < numberOfRows; j++) {
      let b = ' ';
      let button = document.createElement('button')
      button.className = 'button'
      button.textContent = String(b)
      rou.appendChild(button)
    }
  }
  fild.addEventListener("click", (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return
    }
    else {
      console.log(numberClicks.textContent)
      if (numberClicks.textContent == 0) {
        mas = [...Array(Number(numberOfRows) * Number(numberOfRows)).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, 15)
        let c = 0
        let fild1 = document.querySelector('.fild')
        for (let i = 0; i < fild1.children.length; i++) {
          for (let j = 0; j < fild1.children[i].children.length; j++) {
            let a = c + j
            for (let count in mas) {
              if (mas[count] == a) {
                fild1.children[i].children[j].textContent = 'x'
              }
            }
          }
          c += Number(numberOfRows)
        }
        /*numberClicks.textContent = Number(numberClicks.textContent) + 1
        fildClick(event.target)
        return*/
      }
      numberClicks.textContent = Number(numberClicks.innerHTML) + 1
      fildClick(event.target)
      return
    }
  })
}


function fildClick(event) {
  let c = 0
  let d = 0
  let fild1 = document.querySelector('.fild')
  for (let i = 0; i < fild1.children.length; i++) {
    for (let j = 0; j < fild1.children[i].children.length; j++) {
      if (event == fild1.children[i].children[j]) {
        if (event == fild1.children[i].children[fild1.children[i].children.length - 1]) {
          let a = c + j
          for (let count in mas) {
            if (mas[count] == a) {
              event.textContent = 'x'
              event.className = 'button-bomb'
              event.disabled = true
              bombIn()
              /*let restart = document.createElement('div')
              restart.className = 'restart'
              conteiner.appendChild(restart)*/
              return
            }
            if (mas[count] == a - 1 || mas[count] == a + numberOfRows || mas[count] == a + (numberOfRows - 1) || mas[count] == a - (numberOfRows + 1) || mas[count] == a - numberOfRows) {
              d += 1
              switch (d) {
                case 1:
                  event.style = 'color: #000000'
                  break;
                case 2:
                  event.style = 'color: #0019ff'
                  break;
                case 3:
                  event.style = 'color: #ff9500'
                  break;
                case 4:
                  event.style = 'color: #00ff23'
                  break;
                case 5:
                  event.style = 'color: aqua'
                  break;
                case 6:
                  event.style = 'color: #ff0000'
                  break;
                case 7:
                  event.style = 'color: #00054f'
                  break;
                case numberOfRows:
                  event.style = 'color: #4f0000'
                  break;
                default:
                  console.log("Sorry, we are out of " + d + ".");
              }
              event.textContent = d
              event.className = 'not-button-bomb'
              event.disabled = true
            }
          }
        }

        else if (event == fild1.children[i].children[0]) {
          let a = c + j
          for (let count in mas) {
            if (mas[count] == a) {
              event.textContent = 'x'
              event.className = 'button-bomb'
              event.disabled = true
              bombIn()
              /*let restart = document.createElement('div')
              restart.className = 'restart'
              conteiner.appendChild(restart)*/
              return
            }
            if (mas[count] == a + 1 || mas[count] == a + (numberOfRows + 1) || mas[count] == a + numberOfRows || mas[count] == a - numberOfRows || mas[count] == a - (numberOfRows-1)) {
              d += 1
              switch (d) {
                case 1:
                  event.style = 'color: #000000'
                  break;
                case 2:
                  event.style = 'color: #0019ff'
                  break;
                case 3:
                  event.style = 'color: #ff9500'
                  break;
                case 4:
                  event.style = 'color: #00ff23'
                  break;
                case 5:
                  event.style = 'color: aqua'
                  break;
                case 6:
                  event.style = 'color: #ff0000'
                  break;
                case 7:
                  event.style = 'color: #00054f'
                  break;
                case numberOfRows:
                  event.style = 'color: #4f0000'
                  break;
                default:
                  console.log("Sorry, we are out of " + d + ".");
              }
              event.textContent = d
              event.className = 'not-button-bomb'
              event.disabled = true
            }
          }
        }

        else if (event !== fild1.children[i].children[0] || event == fild1.children[i].children[fild1.children[i].children.length - 1]) {
          let a = c + j;
          for (let count in mas) {
            if (mas[count] == a) {
              event.textContent = 'x'
              event.className = 'button-bomb'
              event.disabled = true
              bombIn()
              /*let restart = document.createElement('div')
              restart.className = 'restart'
              conteiner.appendChild(restart)*/
              return
            }
            if (mas[count] == a + 1 || mas[count] == a - 1 || mas[count] == a + (numberOfRows + 1) || mas[count] == a + numberOfRows || mas[count] == a + (numberOfRows - 1) || mas[count] == a - (numberOfRows + 1) || mas[count] == a - numberOfRows || mas[count] == a - (numberOfRows - 1)) {
              d += 1
              switch (d) {
                case 1:
                  event.style = 'color: #000000'
                  break;
                case 2:
                  event.style = 'color: #0019ff'
                  break;
                case 3:
                  event.style = 'color: #ff9500'
                  break;
                case 4:
                  event.style = 'color: #00ff23'
                  break;
                case 5:
                  event.style = 'color: aqua'
                  break;
                case 6:
                  event.style = 'color: #ff0000'
                  break;
                case 7:
                  event.style = 'color: #00054f'
                  break;
                case numberOfRows:
                  event.style = 'color: #4f0000'
                  break;
                default:
                  console.log("Sorry, we are out of " + d + ".");
              }
              event.textContent = d
              event.className = 'not-button-bomb'
              event.disabled = true
            }
          }
        }
      }
    }
    c += Number(numberOfRows)
  }
  event.className = 'not-button-bomb'
  event.disabled = true
  return
}

function bombIn() {
  let c = 0
  let fild1 = document.querySelector('.fild')
  for (let i = 0; i < fild1.children.length; i++) {
    for (let j = 0; j < fild1.children[i].children.length; j++) {
      let a = c + j
      fild1.children[i].children[j].className = 'not-button-bomb'
      fild1.children[i].children[j].disabled = true
      for (let count in mas) {
        if (mas[count] == a) {
          fild1.children[i].children[j].textContent = 'x'
          fild1.children[i].children[j].className = 'button-bomb'
          fild1.children[i].children[j].disabled = true
        }
      }
    }
    c += numberOfRows
  }
  return
}


