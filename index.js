/*'use strict'*/
let numberOfRows = 8;
let numberOfBomb = 10;
let mas;
let body = document.querySelector('body')
let conteiner = document.createElement('div')
conteiner.className = 'conteiner'
body.appendChild(conteiner)

let numberClicks = document.createElement('p')
let fild = document.createElement('div')

let arr = {
	'easy': 6,
	'difficult': 10,
	'advanced': 12
};

let select = document.createElement('select');
conteiner.appendChild(select);
select.id = 'select'
let selectSelector = document.querySelector('#select');
for (let value1 in arr) {
	let option = document.createElement('option');
	option.text = value1;
	option.value = value1;
	option.selected = true
	selectSelector.appendChild(option);
}
selectSelector.value = '';

select.addEventListener('change', function () {
	numberClicks.textContent = 0;
	for (let i = 0; i < fild.children.length;) {
		fild.removeChild(fild.children[i]);
	}
	this.selected = false
	numberOfRows = arr[this.value]
	if (conteiner.children.length > 1) {
		for (let i = 0; i < conteiner.children.length; i++) {
			conteiner.removeChild(conteiner.children[1]);
		}
	}
	start(numberOfRows)
});
start(8)

function start(numberOfRows) {
	numberOfRows = Number(numberOfRows)
	mas = [...Array(Number(numberOfRows) * Number(numberOfRows)).keys()]
		.sort(() => Math.random() - 0.5)
		.slice(0, Number(numberOfBomb))
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
			button.addEventListener("click", clickButton)
			rou.appendChild(button)
		}
	}
}
function clickButton() {
	let but = this
	let c = 0;
	let d = 0;
	let fild1 = document.querySelector('.fild')
	for (let i = 0; i < fild1.children.length; i++) {
		for (let j = 0; j < fild1.children[i].children.length; j++) {
			let a = c + j
			for (let count in mas) {
				if (mas[count] == a) {
					if (numberClicks.textContent == 0) {
						if (this == fild1.children[i].children[j]) {
							console.log(mas)
							mas.splice(count, 1, mas[count] + 1)
							function func() {
								for (let count1 in mas) {
									if (mas[count1] == mas[count]) {
										d++
										if (d > 1) {
											mas.splice(count, 1, mas[count1] + 1)
											return func()
										}
									}
								}
							}
							func();
							console.log(mas)
						}
					}
					/*fild1.children[i].children[j].textContent = 'x'*/
				}
			}
		}
		c += Number(numberOfRows)
	}
	setTimeout(() => {
		numberClicks.textContent = Number(numberClicks.innerHTML) + 1;
		fildClick(but);
		openRiteToNumber(but)
		openLeftToNumber(but)
		ifTheButtonIsFinal();
	});
}

function ifTheButtonIsFinal() {
	let b = 0;
	let d = 0;
	let fild1 = document.querySelector('.fild')
	for (let i = 0; i < fild1.children.length; i++) {
		for (let j = 0; j < fild1.children[i].children.length; j++) {
			if (fild1.children[i].children[j].className == 'button-bomb') {
				return
			}
			else if (fild1.children[i].children[j].className == 'not-button-bomb') {
				d++
				if (Number(d) == (numberOfRows * numberOfRows - Number(numberOfBomb))) {
					let restart = document.createElement('div')
					restart.className = 'restart'
					for (let h = 0; h < fild1.children.length; h++) {
						for (let g = 0; g < fild1.children[h].children.length; g++) {
							let e = b + g;
							fild1.children[h].children[g].className = 'not-button-bomb'
							fild1.children[h].children[g].disabled = true
							for (let count in mas) {
								if (mas[count] == e) {
									fild1.children[h].children[g].textContent = 'x'
									fild1.children[h].children[g].className = 'button-bomb-heppi'
									fild1.children[h].children[g].disabled = true
								}
							}
						}
						b += Number(numberOfRows)
					}
					/* conteiner.appendChild(restart)*/
					return
				}
			}
		}
	}
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
						if (mas[count] == a + 1 || mas[count] == a + (numberOfRows + 1) || mas[count] == a + numberOfRows || mas[count] == a - numberOfRows || mas[count] == a - (numberOfRows - 1)) {
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

function openRiteToNumber(event) {
	let fild1 = document.querySelector('.fild')
	for (let i = 0; i < fild1.children.length; i++) {
		for (let j = 0; j < fild1.children[i].children.length; j++) {
			if (event.className == 'button-bomb') {
				return
			}
			else if (event == fild1.children[i].children[j]) {
				for (let h = i; h < fild1.children.length;) {
					for (let g = j; g < fild1.children[h].children.length;) {
						if (fild1.children[h].children[g] == undefined) {
							if (fild1.children[h + 1].children[g] !== undefined) {
								j = 0
								i=i+1
							}
							return
						}
						else {
							if ((fild1.children[h].children.length) == g) {
								j = 0
								i=i+1
							}
							else {
								fild1.children[h].children[g].className = 'not-button-bomb'
								fild1.children[h].children[g].disabled = true
								if (openUpFild(fild1.children[h].children[g]) > 0) {
									g++
									return
								}
								else {
									if (fild1.children[h].children[g+1] == undefined) {
										return
									}
									else{
										g++
									}
									

								}
							}
						}
					}
				}
			}
		}
	}
	return
}

function openLeftToNumber(event) {
	let fild1 = document.querySelector('.fild')
	for (let i = 0; i < fild1.children.length; i++) {
		for (let j = 0; j < fild1.children[i].children.length; j++) {
			if (event.className == 'button-bomb') {
				return
			}
			else if (event == fild1.children[i].children[j]) {
				debugger
				for (let h = i; h >= 0;) {
					for (let g = j; g >= 0;) {
						if (fild1.children[h].children[g] == undefined) {
							if (fild1.children[h - 1].children[g] !== undefined) {
								j = 0
								i=i-1
							}
							return
						}
						else {
							if ((fild1.children[h].children.length) == g) {
								j = 0
								i=i-1
							}
							else {
								fild1.children[h].children[g].className = 'not-button-bomb'
								fild1.children[h].children[g].disabled = true
								if (openUpFild(fild1.children[h].children[g]) > 0) {
									g--
									return
								}
								else {
									if (fild1.children[h].children[g-1] == undefined) {
										return
									}
									else{
										g--
									}
									

								}
							}
						}
					}
				}
			}
		}
	}
	return
}

function openUpFild(event) {
	let c = 0
	let d = 0
	let fild1 = document.querySelector('.fild')
	for (let i = 0; i < fild1.children.length; i++) {
		for (let j = 0; j < fild1.children[i].children.length; j++) {
			if (event == fild1.children[i].children[j]) {
				if (event == fild1.children[i].children[fild1.children[i].children.length - 1]) {
					let a = c + j
					for (let count in mas) {
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
						if (mas[count] == a + 1 || mas[count] == a + (numberOfRows + 1) || mas[count] == a + numberOfRows || mas[count] == a - numberOfRows || mas[count] == a - (numberOfRows - 1)) {
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
	return d
}