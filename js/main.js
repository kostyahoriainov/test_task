var items = [{
	id: 0,
	name: "Овсяная каша с фруктами",
	img: "i/im1.jpg",
	price: 25,
	type: "dinner"
},
{
	id: 1,
	name: "Яичница глазунья с овощами на сковородке",
	img: "i/im2.jpg",
	price: 25,
	type: "dinner"
},
{
	id: 2,
	name: "Сет азербайджанский завтрак",
	img: "i/im3.jpg",
	price: 30,
	type: "dinner"
},
{
	id: 3,
	name: "Яичница с помидорами по-бакински",
	img: "i/im4.jpg",
	price: 45,
	type: "dinner"
},
{
	id: 4,
	name: "Сырники со сметаной",
	img: "i/im5.jpg",
	price: 45,
	type: "dinner"
},
{
	id: 5,
	name: "Шпинатный крем-суп",
	img: "i/im6.jpg",
	price: 50,
	type: "firstMeal"
},
{
	id: 6,
	name: "Суп Пити",
	img: "i/im7.jpg",
	price: 85,
	type: "firstMeal"
},
{
	id: 7,
	name: "Борщ украинский",
	img: "i/im8.jpg",
	price: 95,
	type: "firstMeal"
},
{
	id: 8,
	name: "Суп Кюфта Бозбаш",
	img: "i/im9.jpg",
	price: 100,
	type: "firstMeal"
},
{
	id: 9,
	name: "Картофель фри",
	img: "i/im10.jpg",
	price: 125,
	type: "garnish"
},
{
	id: 10,
	name: "Картофель по-домашнему",
	img: "i/im11.jpg",
	price: 135,
	type: "garnish"
},
{
	id: 11,
	name: "Рис с овощами",
	img: "i/im12.jpg",
	price: 150,
	type: "garnish"
}];


function createItemsList (){
	for (var i = 0; i < items.length; i++) {

		var item = document.createElement('div');
		item.classList = ('product-box__item');
		item.setAttribute('data-price', items[i].price);
		item.setAttribute('data-type', items[i].type);

		var title = document.createElement('h3');
		title.classList = ('product-box__title');
		title.value = items[i].name;
		title.innerText = items[i].name;

		var boxImg = document.createElement('div');
		boxImg.classList = ('product-box__img');

		var img = document.createElement('img');
		img.classList = ('img-fluid');
		img.src = items[i].img;

		var boxMeta = document.createElement('div');
		boxMeta.classList = ('product-box__meta');

		var price = document.createElement('p');
		price.value = items[i].price;
		price.innerText = (items[i].price+" грн.");

		var qty = document.createElement('div');
		qty.classList = ('qty')

		var qtyInput = document.createElement('input');
		qtyInput.classList = ('qty__item');
		qtyInput.type = 'number';

		var span = document.createElement('span');
		span.innerText = ('Кол');

		var btn = document.createElement('button');
		btn.classList = ('product-box__btn');
		btn.setAttribute('data-id', items[i].id);
		btn.innerText = ('Добавить');

		boxImg.appendChild(img);
		qty.appendChild(qtyInput);
		qty.appendChild(span);
		boxMeta.appendChild(price);
		boxMeta.appendChild(qty);
		boxMeta.appendChild(btn);
		item.appendChild(title);
		item.appendChild(boxImg);
		item.appendChild(boxMeta);

		document.getElementById('list').appendChild(item);
	}
};

createItemsList();


var btnList = document.querySelectorAll('.product-box__btn'),
	btnArray = Array.prototype.slice.call(btnList);
for (var i = 0; i < btnArray.length; i++) {
	btnArray[i].addEventListener('click', addToCart);
};

var totalPrice = 0,
	totalAmount = 0;

function addToCart(){
	var btnId = this.getAttribute('data-id'),
		thisPrice = getPrice(items, btnId),
		priceSpan = document.getElementById('js-price'),
		amountSpan = document.getElementById('js-amount'),
		input = this.previousSibling.childNodes[0];
		if (input.value >= 2) {
			totalPrice = thisPrice * input.value + totalPrice;
			totalAmount = totalAmount + parseInt(input.value);
			priceSpan.innerText = totalPrice;
			amountSpan.innerText = totalAmount;
		} else if (input.value < 0) {
			alert("Ошибка");
		} else {
			totalPrice = totalPrice + thisPrice;
			totalAmount++;
			priceSpan.innerText = totalPrice;
			amountSpan.innerText = totalAmount;
		}
}

function getPrice(array, id) {
	for (var i = 0; i < items.length; i++) {
		if (items[i].id == id) {
			var price = items[i].price;
			return price;
		}
	}
}

function filter () {
	var selectedTypeIndex = document.getElementById('js-select-type').selectedIndex,
		selectedTypeOptions = document.getElementById('js-select-type').options,
		selectedType = selectedTypeOptions[selectedTypeIndex].value,
		itemsList = document.querySelectorAll('.product-box__item'),
		itemsArray = Array.prototype.slice.call(itemsList);
		//индекс выбраного селекта
		//варианты селекта
		//значение выбраного селекта
		//список селекторов с классом product-box__item
		//форматируем список в массив
	var selectedPriceIndex = document.getElementById('js-select-price').selectedIndex,
		selectedPriceOptions = document.getElementById('js-select-price').options,
		selectedPrice = selectedPriceOptions[selectedPriceIndex].value;

		for ( var i = 0; i < itemsArray.length; i++) {
			itemsArray[i].style.display = 'flex';

			if ((selectedType != '*') && (selectedPrice != '*')) {
				console.log('type price');
				itemsArray[i].style.display = 'none';
				if ((itemsArray[i].getAttribute('data-type') == selectedType) && (itemsArray[i].getAttribute('data-price') <= parseInt(selectedPrice)))
					itemsArray[i].style.display = 'flex';
				//фильтрация по цене и типу

			} else if (selectedPrice != '*') {
				console.log('price');
				itemsArray[i].style.display = 'none';
				if (itemsArray[i].getAttribute('data-price') <= parseInt(selectedPrice)) {
					itemsArray[i].style.display = 'flex';
					//фильтрация по цене
				}

			} else if (selectedType != '*') {
				console.log('type');
				if (itemsArray[i].getAttribute('data-type') != selectedType) {
					itemsArray[i].style.display = 'none';
					//фильтрация по типу
				}

			} else {
				console.log('all');
				itemsArray[i].style.display = 'flex';
				//без фильтрации
			}
		}
}


var btnCheck = document.getElementById('js-btn-check'),
	modal = document.getElementById('js-modal'),
	close = document.getElementById('js-close');

	btnCheck.addEventListener('click', function(){
		modal.style.display = 'block';
	});
	close.addEventListener('click', function(){
		modal.style.display = 'none';
	});

function sendOrder(){
	var modalInputsList = document.querySelectorAll('.modal-input'),
		modalInputsArray = Array.prototype.slice.call(modalInputsList);

	if ((modalInputsArray[0].value == '') || (modalInputsArray[1].value == '')) {
		alert('Error');
		//проверка на пустоту
	} else if ((modalInputsArray[0].value.replace(/\s/g,'') == '') || (modalInputsArray[1].value.replace(/\s/g,'') == '')) {
		alert('Error');
		//проверка на пробелы
	} else {
		var priceSpan = document.getElementById('js-price'),
			amountSpan = document.getElementById('js-amount');
		alert('Благодарим за покупку');
		modal.style.display = 'none';
		priceSpan.innerText = 'XXX';
		amountSpan.innerText = 'XXX';
	}
}
