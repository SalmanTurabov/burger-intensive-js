// изменение цвета надписи блока с классом main-title на красный
// document.getElementsByClassName("main-title")[0].style.color = "red";

// Обработчик события по клику. Создание функции которая делает плавный скрол с элемента с id="main-action-button" к блоку с элементом id="products" 
document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// При клики на ссылки с класом .menu-item будем переходить в блоки с одноименным названием id, что  и в data-link. К примеру при нажатии на ссылку data-link="why" нас переведет в блок с id="why"
let links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" });
    }
}

// Обработчик событий по клику на кнопку Заказать в наших карточках товара 
// Т.е при наведении на кнопку с классом product-button мы будем переходить в блок с id="order"


let buttons = document.getElementsByClassName("product-button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    }
}

// валидация поля заказа Нам первым делом нужно найти все элементы id которые находятся в наших полях. Для удобства их можно разместить в отдельные переменные
let burger = document.getElementById("burger");
let nam = document.getElementById("nam");
let phone = document.getElementById("phone");

// повесим обработчик событий на кнопку id="order-action
document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [burger, nam, phone].forEach(item => {
        if (!item.value) {
            item.parentElement.style.background = "red";
            hasError = true;
        } else {
            item.parentElement.style.background = "";
        }
    });

    // обработка результата нашей валидации Если во время проверки ошибки не возникло то тогда мы пользователю будем выводит Спасибо за заказ и очищать формы

    if (!hasError) {
        [burger, nam, phone].forEach(item => {
            item.value = "";
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
    }
}

// создадим переменную для элементов с классом products-item-price
// замена значений в карточках Т.е мы должны найти все элементы с классом class="products-item-price" и пройдтись по ним в цикле и поменять там значения и сохраним в переменную let prices, чтобы каждый раз при нажатии на кнопку мы не искали их заново
let prices = document.getElementsByClassName("products-item-price");

// перключение валют
document.getElementById("change-currency").onclick = function (e) {
    let currentCurrency = e.target.innerText;

    let newCurrency = "$";
    let coefficient = 1;

    // если у нас стоит доллар, то меняем на рубль
    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 80;
    } 
    else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    }
    else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    }
    else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }
    // замена текста в кнопке
    e.target.innerText = newCurrency;

    // используем let prices = document.getElementsByClassName("products-item-price"); для того чтобы пройтись циклом по нему и в каждом элементе заменить на нужное новое значение пересчитав по актуальному курсу

    for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
}



