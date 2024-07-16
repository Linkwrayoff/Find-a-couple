(function () {
	// ---------- Создание тела документа ----------
	function createMainDiv() {
	  const mainPageDiv = document.createElement('div');
	  mainPageDiv.classList.add('mainDiv')
  
	  const mainTitle = document.createElement('h1');
	  mainTitle.classList.add('mainTitle');
  
	  const mainForm = document.createElement('div');
	  mainForm.classList.add('mainForm');
  
	  const mainText = document.createElement('p');
	  mainText.classList.add('mainText');
  
	  const mainInput = document.createElement('input');
	  mainInput.classList.add('mainInput');
	  mainInput.value = '3';
  
	  const startButton = document.createElement('button');
	  startButton.classList.add('startBtn');
  
	  const errorText = document.createElement('div');
	  errorText.classList.add('errorText');
	  errorText.textContent = "Число не может быть меньше 3 и больше 9";
  
	  mainTitle.textContent = 'Найди пару';
	  mainText.textContent = 'Введите количество пар, от 3 до 9';
	  mainInput.type = 'number';
	  startButton.textContent = 'Начать игру';
  
	  mainPageDiv.append(mainTitle, mainForm, errorText);
	  mainForm.append(mainText, mainInput, startButton);
	  document.body.append(mainPageDiv);
  
	  return {
		startButton,
		mainInput,
		mainPageDiv,
	  };
	};
  
	const {
	  startButton,
	  mainInput,
	  mainPageDiv,
	} = createMainDiv();
  
  
	// ---------- функция создания массива ----------
	function createNumbersArray(count) {
	  let arr = [];
	  for (let i = 1; i <= count; i++) {
		arr.push(i, i);
	  }
	  return arr;
	};
  
	// ---------- функция перемешивания массива ----------
	function shuffle(arr) {
	  for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	  }
	  return arr;
	};
  
	// ---------- Исходный блок становится невидимым ----------
	startButton.addEventListener('click', () => {
	  if (mainInput.value < 3 || mainInput.value > 9) {
		mainPageDiv.childNodes[2].style.display = 'block';
	  } else {
		startGame(mainInput.value);
		mainPageDiv.style.display = 'none';
		mainPageDiv.childNodes[2].style.display = 'none';
	  }
	});
  
	// ---------- Объединение подфункций ----------
	function startGame(count) {
	  let usedArray = createNumbersArray(count);
	  usedArray = shuffle(usedArray);
  
	  // ---------- Создание карточек по импуту ----------
	  const cardContainer = document.createElement('div');
	  cardContainer.classList.add('card-container');
	  document.body.append(cardContainer);
  
	  for (let i = 0; i < usedArray.length; i++) {
		let card = document.createElement('div');
		card.classList.add('card');
		card.textContent = usedArray[i];
  
		card.addEventListener('click', () => {
		  if (!isProcessing && !card.classList.contains('open')) {
			flip(card);
		  }
		});
  
		cardContainer.append(card);
	  }
  
	  // ---------- Переворот карточек ----------
	  let firstCard = null;
	  let secondCard = null;
	  let isProcessing = false;
  
	  function flip(card) {
		card.classList.add('open');
  
		if (firstCard === null) {
		  firstCard = card;
		} else if (secondCard === null) {
		  secondCard = card;
		}
  
		// ---------- Сравнение значений ----------
		if (firstCard !== null && secondCard !== null) {
		  isProcessing = true;
		  if (firstCard.textContent === secondCard.textContent) {
			firstCard.classList.add('success');
			secondCard.classList.add('success');
			resetCards();
		  } else {
			setTimeout(() => {
			  firstCard.classList.remove('open');
			  secondCard.classList.remove('open');
			  resetCards();
			}, 500);
		  }
		}
  
		if (document.querySelectorAll('.card.success').length == usedArray.length) {
		  setTimeout(() => {
			alert('Победа!');
			mainPageDiv.style.display = 'block';
			cardContainer.remove();
			newGameButton.remove();
			mainInput.value = '3';
		  }, 300);
		}
	  }
	  // ---------- Обнуление значений пар ----------
	  function resetCards() {
		firstCard = null;
		secondCard = null;
		isProcessing = false;
	  }
  
	  // ---------- Кнопка новой игры ----------
	  const newGameButton = document.createElement('button');
	  newGameButton.classList.add('newGameBtn');
	  newGameButton.textContent = "Попробовать снова";
  
	  newGameButton.addEventListener('click', () => {
		mainPageDiv.style.display = 'block';
		cardContainer.remove();
		newGameButton.remove();
		mainInput.value = '3';
	  });
  
	  document.body.append(newGameButton);
	};
  })();
  